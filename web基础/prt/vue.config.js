const { defineConfig } = require("@vue/cli-service");
const { VantResolver } = require("unplugin-vue-components/resolvers");
const ComponentsPlugin = require("unplugin-vue-components/webpack");
const path = require("path");
const fs = require("fs");

if (process.env.NODE_ENV !== "development") {
  const test = {
    versionTime: new Date().getTime() + "",
    refresh: "operation", // 不刷新'no'，手动刷新'operation', 强制刷新'forced'
  };
  fs.writeFile("./public/version.json", JSON.stringify(test), () => {
    console.log("新版本号生成成功");
  });
}
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  publicPath: "/",
  outputDir: "dist",
  transpileDependencies: true,
  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: (config) => {
    // 配置别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("router", resolve("src/router"))
      .set("utils", resolve("src/utils"))
      .set("store", resolve("src/store"))
      .set("views", resolve("src/views"))
      .set("mixins", resolve("src/mixins"))
      .set("public", resolve("./public"));
  },
  css: {
    loaderOptions: {},
  },
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  devServer: {
    port: 8099,
    // https: true,
    proxy: {
      "/youka": {
        // target: "https://127.0.0.0:8080", // 目标主机
        // target: 'https://test-gw.yljf.net/retail-saas',
        // target: 'http://192.168.30.133:8081/web',
        // target: 'http://192.168.30.194:8081/web',
        // target: 'http://192.168.30.207:8081/web',
        // target: 'http://192.168.30.207:8081/web',
        // target: 'http://192.168.30.148:8081/web',
        // target: "https://dev-gw.youxinsign.com", // 何江奎
        target: "http://192.168.2.71:8090",
        // ws: true, // 代理的WebSockets
        changeOrigin: true, // 允许websockets跨域
        // logLevel: 'debug',
        pathRewrite: {
          "^/youka": "",
        },
      },
      "/upload": {
        target: "https://dev-gw.youxinsign.com", // 何江奎
        // target: 'http://192.168.30.81:8081/web',
        // ws: true, // 代理的WebSockets
        changeOrigin: true, // 允许websockets跨域
        pathRewrite: {
          "^/upload": "",
        },
      },
    },
    client: {
      overlay: false,
    },
  },
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
});
