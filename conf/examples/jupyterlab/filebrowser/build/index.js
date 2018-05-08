"use strict";
// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
Object.defineProperty(exports, "__esModule", { value: true });
require("es6-promise/auto"); // polyfill Promise on IE
require("@jupyterlab/theme-light-extension/style/embed.css");
require("../index.css");
var algorithm_1 = require("@phosphor/algorithm");
var commands_1 = require("@phosphor/commands");
var widgets_1 = require("@phosphor/widgets");
var services_1 = require("@jupyterlab/services");
var apputils_1 = require("@jupyterlab/apputils");
var filebrowser_1 = require("@jupyterlab/filebrowser");
var docmanager_1 = require("@jupyterlab/docmanager");
var docregistry_1 = require("@jupyterlab/docregistry");
var codemirror_1 = require("@jupyterlab/codemirror");
var fileeditor_1 = require("@jupyterlab/fileeditor");
function main() {
    var manager = new services_1.ServiceManager();
    manager.ready.then(function () {
        createApp(manager);
    });
}
function createApp(manager) {
    var widgets = [];
    var activeWidget;
    var opener = {
        open: function (widget) {
            if (widgets.indexOf(widget) === -1) {
                dock.addWidget(widget, { mode: 'tab-after' });
                widgets.push(widget);
            }
            dock.activateWidget(widget);
            activeWidget = widget;
            widget.disposed.connect(function (w) {
                var index = widgets.indexOf(w);
                widgets.splice(index, 1);
            });
        }
    };
    var docRegistry = new docregistry_1.DocumentRegistry();
    var docManager = new docmanager_1.DocumentManager({
        registry: docRegistry,
        manager: manager,
        opener: opener
    });
    var editorServices = {
        factoryService: new codemirror_1.CodeMirrorEditorFactory(),
        mimeTypeService: new codemirror_1.CodeMirrorMimeTypeService()
    };
    var wFactory = new fileeditor_1.FileEditorFactory({
        editorServices: editorServices,
        factoryOptions: {
            name: 'Editor',
            modelName: 'text',
            fileTypes: ['*'],
            defaultFor: ['*'],
            preferKernel: false,
            canStartKernel: true
        }
    });
    docRegistry.addWidgetFactory(wFactory);
    var commands = new commands_1.CommandRegistry();
    var fbModel = new filebrowser_1.FileBrowserModel({ manager: docManager });
    var fbWidget = new filebrowser_1.FileBrowser({
        id: 'filebrowser',
        commands: commands,
        model: fbModel
    });
    // Add a creator toolbar item.
    var creator = new apputils_1.ToolbarButton({
        className: 'jp-AddIcon',
        onClick: function () {
            docManager.newUntitled({
                type: 'file',
                path: fbModel.path
            }).then(function (model) {
                docManager.open(model.path);
            });
        }
    });
    creator.addClass('jp-MaterialIcon');
    fbWidget.toolbar.insertItem(0, 'create', creator);
    var panel = new widgets_1.SplitPanel();
    panel.id = 'main';
    panel.addWidget(fbWidget);
    widgets_1.SplitPanel.setStretch(fbWidget, 0);
    var dock = new widgets_1.DockPanel();
    panel.addWidget(dock);
    widgets_1.SplitPanel.setStretch(dock, 1);
    dock.spacing = 8;
    document.addEventListener('focus', function (event) {
        for (var i = 0; i < widgets.length; i++) {
            var widget = widgets[i];
            if (widget.node.contains(event.target)) {
                activeWidget = widget;
                break;
            }
        }
    });
    // Add commands.
    commands.addCommand('file-open', {
        label: 'Open',
        icon: 'fa fa-folder-open-o',
        mnemonic: 0,
        execute: function () {
            algorithm_1.each(fbWidget.selectedItems(), function (item) {
                docManager.openOrReveal(item.path);
            });
        }
    });
    commands.addCommand('file-rename', {
        label: 'Rename',
        icon: 'fa fa-edit',
        mnemonic: 0,
        execute: function () { fbWidget.rename(); }
    });
    commands.addCommand('file-save', {
        execute: function () {
            var context = docManager.contextForWidget(activeWidget);
            context.save();
        }
    });
    commands.addCommand('file-cut', {
        label: 'Cut',
        icon: 'fa fa-cut',
        execute: function () { fbWidget.cut(); }
    });
    commands.addCommand('file-copy', {
        label: 'Copy',
        icon: 'fa fa-copy',
        mnemonic: 0,
        execute: function () { fbWidget.copy(); }
    });
    commands.addCommand('file-delete', {
        label: 'Delete',
        icon: 'fa fa-remove',
        mnemonic: 0,
        execute: function () { fbWidget.delete(); }
    });
    commands.addCommand('file-duplicate', {
        label: 'Duplicate',
        icon: 'fa fa-copy',
        mnemonic: 0,
        execute: function () { fbWidget.duplicate(); }
    });
    commands.addCommand('file-paste', {
        label: 'Paste',
        icon: 'fa fa-paste',
        mnemonic: 0,
        execute: function () { fbWidget.paste(); }
    });
    commands.addCommand('file-download', {
        label: 'Download',
        icon: 'fa fa-download',
        execute: function () { fbWidget.download(); }
    });
    commands.addCommand('file-shutdown-kernel', {
        label: 'Shutdown Kernel',
        icon: 'fa fa-stop-circle-o',
        execute: function () { fbWidget.shutdownKernels(); }
    });
    commands.addCommand('file-dialog-demo', {
        label: 'Dialog Demo',
        execute: function () { dialogDemo(); }
    });
    commands.addCommand('file-info-demo', {
        label: 'Info Demo',
        execute: function () {
            var msg = 'The quick brown fox jumped over the lazy dog';
            apputils_1.showDialog({
                title: 'Cool Title',
                body: msg,
                buttons: [apputils_1.Dialog.okButton()]
            });
        }
    });
    commands.addKeyBinding({
        keys: ['Enter'],
        selector: '.jp-DirListing',
        command: 'file-open'
    });
    commands.addKeyBinding({
        keys: ['Accel S'],
        selector: '.jp-CodeMirrorEditor',
        command: 'file-save'
    });
    window.addEventListener('keydown', function (event) {
        commands.processKeydownEvent(event);
    });
    // Create a context menu.
    var menu = new widgets_1.Menu({ commands: commands });
    menu.addItem({ command: 'file-open' });
    menu.addItem({ command: 'file-rename' });
    menu.addItem({ command: 'file-remove' });
    menu.addItem({ command: 'file-duplicate' });
    menu.addItem({ command: 'file-delete' });
    menu.addItem({ command: 'file-cut' });
    menu.addItem({ command: 'file-copy' });
    menu.addItem({ command: 'file-paste' });
    menu.addItem({ command: 'file-shutdown-kernel' });
    menu.addItem({ command: 'file-dialog-demo' });
    menu.addItem({ command: 'file-info-demo' });
    // Add a context menu to the dir listing.
    var node = fbWidget.node.getElementsByClassName('jp-DirListing-content')[0];
    node.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        var x = event.clientX;
        var y = event.clientY;
        menu.open(x, y);
    });
    // Attach the panel to the DOM.
    widgets_1.Widget.attach(panel, document.body);
    // Handle resize events.
    window.addEventListener('resize', function () { panel.update(); });
}
/**
 * Create a non-functional dialog demo.
 */
function dialogDemo() {
    var body = document.createElement('div');
    var input = document.createElement('input');
    input.value = 'Untitled.ipynb';
    var selector = document.createElement('select');
    var option0 = document.createElement('option');
    option0.value = 'python';
    option0.text = 'Python 3';
    selector.appendChild(option0);
    var option1 = document.createElement('option');
    option1.value = 'julia';
    option1.text = 'Julia';
    selector.appendChild(option1);
    body.appendChild(input);
    body.appendChild(selector);
    apputils_1.showDialog({
        title: 'Create new notebook'
    });
}
window.addEventListener('load', main);
