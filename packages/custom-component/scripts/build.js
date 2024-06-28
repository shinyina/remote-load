import { build } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

const __dirname = dirname(fileURLToPath(import.meta.url));

async function buildComponent(name) {
    const componentsDir = resolve(__dirname, '../components');
    const files = fs.readdirSync(componentsDir).filter(file => file.toLowerCase() === `${name.toLowerCase()}.jsx`);

    if (files.length === 0) {
        console.error(`没有找到名称为 ${name}.jsx 的文件`);
        process.exit(1);
    }

    const file = files[0];  // 精确匹配应该只有一个文件
    const outputDir = resolve(__dirname, '../../main/output');
    const outputFileName = `out.${name}.umd.js`;
    const outputPath = resolve(outputDir, outputFileName);

    // 确保输出目录存在
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    await build({
        root: process.cwd(),
        plugins: [vueJsx(),cssInjectedByJsPlugin({topExecutionPriority: false})],
        build: {
            rollupOptions: {
                input: resolve(componentsDir, file),
                output: {
                    format: 'umd',
                    entryFileNames: outputFileName,
                    dir: outputDir,
                    globals: {
                        vue: 'Vue',
                    },
                },
                external: ['vue'],  // 排除公共依赖 vue
            },
            lib: {
                entry: resolve(componentsDir, file),
                name,  // 每个文件的 UMD 格式全局名称
                formats: ['umd'],
            },
            emptyOutDir: false, // 不清空输出目录
        },
    });

    console.log(`成功构建: ${name}.jsx -> ${outputPath}`);
}

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error('请提供要打包的组件名称');
    process.exit(1);
}

const componentName = args[0];
buildComponent(componentName).catch(e => {
    console.error(e);
    process.exit(1);
});
