function Vue(options) {
  var self = this;
  this.data = options.data;
  this.methods = options.methods;

  Object.keys(this.data).forEach(function (key) {
    self.proxyKeys(key);
  });

  observe(this.data);
  new Compile(options.el, this);
  options.mounted.call(this); // 所有事情处理好后执行mounted函数
}

Vue.prototype = {
  proxyKeys: function (key) {
    var self = this;
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: function () {
        return self.data[key];
      },
      set: function (newVal) {
        self.data[key] = newVal;
      },
    });
  },
};
