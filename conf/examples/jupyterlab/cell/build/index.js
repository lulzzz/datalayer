"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
require("es6-promise/auto"); // polyfill Promise on IE
require("@jupyterlab/theme-light-extension/style/embed.css");
require("../index.css");
var apputils_1 = require("@jupyterlab/apputils");
var cells_1 = require("@jupyterlab/cells");
var codemirror_1 = require("@jupyterlab/codemirror");
var completer_1 = require("@jupyterlab/completer");
var rendermime_1 = require("@jupyterlab/rendermime");
var services_1 = require("@jupyterlab/services");
var commands_1 = require("@phosphor/commands");
var widgets_1 = require("@phosphor/widgets");
function main() {
    var manager = new services_1.SessionManager();
    var session = new apputils_1.ClientSession({ manager: manager, name: 'Example' });
    var mimeService = new codemirror_1.CodeMirrorMimeTypeService();
    // Initialize the command registry with the bindings.
    var commands = new commands_1.CommandRegistry();
    var useCapture = true;
    // Setup the keydown listener for the document.
    document.addEventListener('keydown', function (event) {
        commands.processKeydownEvent(event);
    }, useCapture);
    // Create the cell widget with a default rendermime instance.
    var rendermime = new rendermime_1.RenderMimeRegistry({ initialFactories: rendermime_1.standardRendererFactories });
    var cellWidget = new cells_1.CodeCell({
        rendermime: rendermime,
        model: new cells_1.CodeCellModel({})
    });
    // Handle the mimeType for the current kernel.
    session.kernelChanged.connect(function () {
        session.kernel.ready.then(function () {
            var lang = session.kernel.info.language_info;
            var mimeType = mimeService.getMimeTypeByLanguage(lang);
            cellWidget.model.mimeType = mimeType;
        });
    });
    // Start the default kernel.
    session.kernelPreference = { autoStartDefault: true };
    session.initialize();
    // Set up a completer.
    var editor = cellWidget.editor;
    var model = new completer_1.CompleterModel();
    var completer = new completer_1.Completer({ editor: editor, model: model });
    var connector = new completer_1.KernelConnector({ session: session });
    var handler = new completer_1.CompletionHandler({ completer: completer, connector: connector });
    // Set the handler's editor.
    handler.editor = editor;
    // Hide the widget when it first loads.
    completer.hide();
    // Create a toolbar for the cell.
    var toolbar = new apputils_1.Toolbar();
    toolbar.addItem('spacer', apputils_1.Toolbar.createSpacerItem());
    toolbar.addItem('interrupt', apputils_1.Toolbar.createInterruptButton(session));
    toolbar.addItem('restart', apputils_1.Toolbar.createRestartButton(session));
    toolbar.addItem('name', apputils_1.Toolbar.createKernelNameItem(session));
    toolbar.addItem('status', apputils_1.Toolbar.createKernelStatusItem(session));
    // Lay out the widgets.
    var panel = new widgets_1.BoxPanel();
    panel.id = 'main';
    panel.direction = 'top-to-bottom';
    panel.spacing = 0;
    panel.addWidget(completer);
    panel.addWidget(toolbar);
    panel.addWidget(cellWidget);
    widgets_1.BoxPanel.setStretch(toolbar, 0);
    widgets_1.BoxPanel.setStretch(cellWidget, 1);
    // Attach the panel to the DOM.
    widgets_1.Widget.attach(panel, document.body);
    // Handle widget state.
    window.addEventListener('resize', function () { panel.update(); });
    cellWidget.activate();
    // Add the commands.
    commands.addCommand('invoke:completer', {
        execute: function () { handler.invoke(); }
    });
    commands.addCommand('run:cell', {
        execute: function () { return cells_1.CodeCell.execute(cellWidget, session); }
    });
    commands.addKeyBinding({
        selector: '.jp-InputArea-editor.jp-mod-completer-enabled',
        keys: ['Tab'],
        command: 'invoke:completer'
    });
    commands.addKeyBinding({
        selector: '.jp-InputArea-editor',
        keys: ['Shift Enter'],
        command: 'run:cell'
    });
}
window.addEventListener('load', main);
