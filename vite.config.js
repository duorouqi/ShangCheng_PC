import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import eslint from '@rollup/plugin-eslint'
import {resolve} from 'path'
// https://vitejs.dev/config/

export default defineConfig({
    // plugins: [vue(),eslint()],
	// server: {
	//     port: '3000',
	//     proxy: {
	//       '/api': {
	//         target: 'http://timesheet-test.yit.life:5500', // 凡是遇到 /api 路径的请求，都映射到 target 属性
	//         changeOrigin: true,
	//       }
	//     }
	//   },
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src') // 路径别名
        },
        extensions: ['.js', '.json', '.less', '.vue'] // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    // server:{
    //   proxy: {
    //     '/test': 'http://timesheet-test.yit.life:5500/',
    //   }
    // },
	server: {
	    port: '3000',
	    open: false, //自动打开 
	    base: "./ ", //生产环境路径
	    proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
	      // 正则表达式写法
	      '^/test': {
	        target: 'http://oa.siud.com', // 后端服务实际地址
	        changeOrigin: true, //开启代理
	        rewrite: (path) => path.replace(/^\/test/, '')
	      }
	    }
	  },
    base: './',
    css: {
        //* css模块化
        modules: { // css模块化 文件以.module.[css|less|scss]结尾
            generateScopedName: '[name]__[local]___[hash:base64:5]',
            hashPrefix: 'prefix',
        },
        //* 预编译支持less
        preprocessorOptions: {
            less: {
                // 支持内联 JavaScript
                javascriptEnabled: true,
            },
        },
    }
})
