### CommonJS modules

* `require.resolve(request[,options])`
  * Use the internal require() machinery to `look up the location of a module`, but rather than loading the module, just return the resolved filename.