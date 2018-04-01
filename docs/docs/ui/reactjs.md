# React.js + Npm + Babel + Webpack

## Step 1

```
mkdir react-hello-world
cd react-hello-world
npm init
```

```
npm install webpack -S
```

```
cat <<EOF >./webpack.config.js
var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'src/main/webapp/public');
var APP_DIR = path.resolve(__dirname, 'src/main/webapp/app');
var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  }
};
module.exports = config;
EOF
cat ./webpack.config.js
```

```
mkdir -p src/main/webapp/app
```

```
cat <<EOF >./src/main/webapp/app/App.jsx
console.log('Hello World!');
EOF
cat ./src/main/webapp/app/App.jsx
```

```
cat <<EOF >./src/main/webapp/index.html
<html>
  <head>
    <meta charset="utf-8">
    <title>React.js using NPM, Babel6 and Webpack</title>
  </head>
  <body>
    <div id="app" />
    <div id="hello" />
    <script src="public/bundle.js" type="text/javascript" />
  </body>
</html>
EOF
cat ./src/main/webapp/index.html
```

```
cat <<EOF >./src/main/webapp/app/main.js
import App from './App.jsx';
EOF
cat ./src/main/webapp/app/main.js
```

```
./node_modules/.bin/webpack -d
xdg-open ./src/main/webapp/index.html
```

## Step 2

```
npm install react react-dom babel-loader babel-core babel-preset-es2015 babel-preset-stage-0 babel-preset-react -S
```

```
cat <<EOF >./webpack.config.js
var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'src/main/webapp/public');
var APP_DIR = path.resolve(__dirname, 'src/main/webapp/app');
var config = {
  entry: APP_DIR + '/main.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader',
        query: { presets: ['es2015', 'stage-0', 'react'] }
      }
    ]
  }
};
module.exports = config;
EOF
cat ./webpack.config.js
```

```
cat <<EOF >./src/main/webapp/app/Hello.jsx
import React from 'react';
import {render} from 'react-dom';
class Hello extends React.Component {
  render () {
    return (<p>Hello React 2!</p>);
//    return React.createElement("h1", null, "Hello Again");
  }
}
render(<Hello/>, document.getElementById('hello'));
export default Hello;
EOF
cat ./src/main/webapp/app/Hello.jsx
```

```
cat <<EOF >./src/main/webapp/app/AwesomeComponent.jsx
import React from 'react';
class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {likesCount : 0};
    this.onLike = this.onLike.bind(this);
  }
  onLike () {
    let newLikesCount = this.state.likesCount + 1;
    this.setState({likesCount: newLikesCount});
  }
  render() {
    return (
      <div>
        Likes : <span>{this.state.likesCount}</span>
        <div><button onClick={this.onLike}>Like Me</button></div>
      </div>
    );
  }
}
export default AwesomeComponent;
EOF
cat ./src/main/webapp/app/AwesomeComponent.jsx
```

```
cat <<EOF >./src/main/webapp/app/App.jsx
import React from 'react';
import {render} from 'react-dom';
import Hello from './Hello.jsx';
import Awesome from './AwesomeComponent.jsx';
class App extends React.Component {
  render () {
    return (
      <div>
        <p>
          Hello React!
          <Hello />
          <Awesome />
        </p>
      </div>
      );
  }
}
render(<App/>, document.getElementById('app'));
export default App;
EOF
cat ./src/main/webapp/app/App.jsx
```

```
./node_modules/.bin/webpack -d
xdg-open ./src/main/webapp/index.html
```

## Step 3

```
./node_modules/.bin/webpack -d --watch
```

## Step 4

```
npm install connect serve-static -S
```

```
cat <<EOF >./server.js
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080, function(){
  console.log('Server running on 8080...');
});
EOF
cat ./server.js
```

```
node ./server.js
xdg-open http://localhost:8080/src/main/webapp/index.html
```

## Step 5

```
cat <<EOF >./package.json
{
  "name": "react-hello-world",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node server.js",
    "dev": "webpack -d --watch",
    "test": "echo \"Error: no test specified\" && exit 1",
    "build" : "webpack -p"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-core": "^6.22.1",
    "babel-loader": "^6.2.10",
    "babel-preset-es2015": "^6.22.0",
    "babel-preset-react": "^6.22.0",
    "connect": "^3.5.0",
    "react": "^15.4.2",
    "react-dom": "^15.4.2",
    "serve-static": "^1.11.2",
    "webpack": "^2.2.1"
  }
}
EOF
cat ./package.json
```

```
// starts server.js.
npm run start
// runs Webpack in watch mode.
npm run dev
// runs Webpack in production mode (which minimizes the bundle file automatically).
npm run build
```

## Step 6

```
npm install webpack-dev-server -S
```

```
webpack-dev-server --progress --colors
```

## Step 7

```
npm install --save-dev react-hot-loader@next
```

```
cat <<EOF >./webpack.config.js
var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'src/main/webapp/public');
var APP_DIR = path.resolve(__dirname, 'src/main/webapp/app');
var config = {
  entry: [
    APP_DIR + '/main.js', // Your appʼs entry point
    'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './scripts/index' // Your appʼs entry point
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders: [ { test: /\.jsx?$/, loaders: ['react-hot', 'jsx?harmony'], include: path.join(__dirname, 'src') } ]
  },
};
module.exports = config;
EOF
cat ./webpack.config.js
```

```
webpack-dev-server --progress --hot --colors
```

## Step 8

# Plugins

+ https://camunda.org
 + https://camunda.org/plugins
 + https://docs.camunda.org/manual/7.5/webapps/cockpit/extend/plugins/
 + https://docs.camunda.org/manual/7.5/examples/tutorials/develop-cockpit-plugin/
 + https://docs.camunda.org/manual/7.5/webapps/cockpit/extend/plugins/#plugin-points

# R

+ googleVis
+ rCharts
+ htmlwidgets
