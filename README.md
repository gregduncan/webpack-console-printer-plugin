# Webpack Console Printer Plugin

This plugin is a hack of the Webpack message handling features in [Create React App](https://github.com/facebookincubator/create-react-app). It is heavily inspired by [friendly-errors-webpack-plugin](https://github.com/geowarin/friendly-errors-webpack-plugin). It includes code from react-dev-utils which can be found in the utils folder. 
## Getting started

### Installation

```bash
npm install webpack-console-printer-plugin --save-dev
```
### Basic usage

Simply add `WebpackPrinter` to the plugin section in your Webpack config.

```javascript
var WebpackPrinter = require('webpack-console-printer-plugin');

var webpackConfig = {
  // ...
  plugins: [
    new WebpackPrinter(),
  ],
  // ...
}
```

### Turn off errors

You need to turn off all error logging by setting your webpack config quiet option to true.

```javascript
// webpack config root
{
  // ...
  devServer: {
    // ...
    quiet: true,
    // ...
  },
  // ...
}
```
## Options

You can pass options to the plugin:

```js
new WebpackPrinter({
  
  // specify apps port. 
  port: 3000,

  // if you're feeling brave set this flag for advanced features.
  experimental: true,
 
})
```

## TODO

- [-] Add unit testing.