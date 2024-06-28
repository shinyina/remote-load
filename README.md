## 使用方法

### 启动开发服务器

在项目根目录下运行以下命令以同时启动两个子项目的开发服务器：

### 单独启动某个子项目

如果你只需要启动某个子项目的开发服务器，可以分别运行以下命令：

启动 `custom-component` 子项目：

<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">sh</span><span class="code-block-header__copy">复制代码</span></div><code class="hljs code-block-body sh">pnpm run component:dev
</code></pre>

启动 `main` 子项目：

<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">sh</span><span class="code-block-header__copy">复制代码</span></div><code class="hljs code-block-body sh">pnpm run main:dev
</code></pre>

### 打包组件

在项目根目录下运行以下命令以同时构建两个子项目：

<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">sh</span><span class="code-block-header__copy">复制代码</span></div><code class="hljs code-block-body sh">pnpm run build xxx
</code></pre>

则将packages/custom-component/components中的组件打包成umd格式输出到packages/main/output中提供main使用
