##  对应 require 方法做了一定程度的重写

Object.defineProperty(module, 'require', {
    value: this._createRequireImplementation(module, options),
});


## _createRequireImplementation 方法的具体实现:
https://github.com/jestjs/jest/blob/main/packages/jest-runtime/src/index.ts#L2059C3-L2059C3


## require.cache

实际处理后返回的内容:

```
    this._createRequireImplementation({
        children: [],
        exports: {},
        filename,
        id: filename,
        isPreloading: false,
        loaded: false,
        path: path.dirname(filename),
    });
```

## 使用 Proxy 实际上重写的部分
https://github.com/jestjs/jest/blob/main/packages/jest-runtime/src/index.ts#L2088

moduleRequire.cache = (() => {
    // TODO: consider warning somehow that this does nothing. We should support deletions, anyways
    const notPermittedMethod = () => true;
    return new Proxy<(typeof moduleRequire)['cache']>(Object.create(null), {
    defineProperty: notPermittedMethod,
    deleteProperty: notPermittedMethod,
    get: (_target, key) =>
        typeof key === 'string' ? this._moduleRegistry.get(key) : undefined,
    getOwnPropertyDescriptor() {
        return {
        configurable: true,
        enumerable: true,
        };
    },
    has: (_target, key) =>
        typeof key === 'string' && this._moduleRegistry.has(key),
    ownKeys: () => Array.from(this._moduleRegistry.keys()),
    set: notPermittedMethod,
    });
})();

