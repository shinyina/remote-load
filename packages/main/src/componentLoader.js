const scriptLoad = (url, name, resolve, componentCache) => {
  // 动态创建script元素
  const script = document.createElement("script");
  script.setAttribute("src", url);
  script.setAttribute("type", "module");

  // 定义加载完成后的处理函数
  const loadHandler = () => {
    const com = window[name];
    if (com) {
      componentCache[name] = com; // 缓存组件
      resolve(com);
    }
    script.removeEventListener("load", loadHandler);
    if (script.parentNode) {
      document.head.removeChild(script);
    }
  };

  // 将加载处理函数绑定到脚本的load事件
  script.addEventListener("load", loadHandler);
  document.head.appendChild(script);
};

const jsSandbox = (name, code) => {
  const fakeWindow = {};
  const proxyWindow = new Proxy(window, {
    // 获取属性
    get(target, key) {

      if (key === Symbol.unscopables) return false;

      // 内部可能访问当这几个变量，都直接返回代理对象
      if (["window", "self", "globalThis"].includes(key)) {
        return proxyWindow;
      }

      return target[key] || fakeWindow[key];
    },
    // 设置属性
    set(target, key, value) {
      return (fakeWindow[key] = value);
    },
    // 判断属性是否有
    has(target, key) {
      return key in target || key in fakeWindow;
    },
  });
  window.proxyWindow = proxyWindow;

  // 这是一个自执行函数
  // 并且通过 `call` 调用，因为 code 可能通过 this 访问 window，所以通过 call 改变 this 指向
  const codeBindScope = `
(function (window) {
  with (window) {
    ${code}
  }
}).call(window.proxyWindow, window.proxyWindow)
`;
  // 通过 new Function 的方式执行
  const fn = new Function(codeBindScope);
  fn();
  return fakeWindow[name];
};

const sandBoxLoad = (url, name, resolve, componentCache) => {
  fetch(url)
    .then((res) => res.text())
    .then((code) => {
      try {
        const Com = jsSandbox(name, code);
        resolve(Com);
        componentCache[name] = Com;
      } catch (error) {
        //打包如果有esm则降级使用script方式加载
        scriptLoad(url, name, resolve, componentCache);
      }
    });
};

export const componentLoader = (() => {
  const componentCache = {};

  return (url, name) => {
    if (componentCache[name]) {
      // 如果组件已缓存，直接返回
      return Promise.resolve(componentCache[name]);
    }

    return new Promise((resolve) => {
      // scriptLoad(url,name,resolve,componentCache);

      sandBoxLoad(url, name, resolve, componentCache);
    });
  };
})();
