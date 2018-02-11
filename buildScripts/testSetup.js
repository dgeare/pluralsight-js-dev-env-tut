//this file isn't transpiled, so must use CommonJS and es5

//register babel first
require('babel-register')();

//disable webpack features Mocha doesn't understand
require.extensions['.css'] = function(){};
