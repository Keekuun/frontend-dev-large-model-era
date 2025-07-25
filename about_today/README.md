# About Today

这是一个基于现代前端技术栈的 Vue 3 项目，主要用于演示或开发与"今日"相关的功能。

## 技术栈

- **核心框架**: Vue 3 (^3.5.13)
- **构建工具**: Vite (^6.2.0)
- **包管理器**: pnpm (10.11.0)
- **语言**: TypeScript (~5.7.2)
- **模板引擎**: Nunjucks (^3.2.4) - 用于处理模板文件
- **样式**: CSS (原生支持)

## 环境变量
项目使用 Vite 的环境变量功能来配置 API 密钥、基础 URL 和 AI 模型等信息。请在根目录下创建一个 `.env` 文件，并添加以下内容：
```
# AI API 配置
VITE_API_KEY='sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
# AI API 基础 URL
VITE_BASE_URL='/v1/chat/completions'
# AI 模型
VITE_AI_MODEL='deepseek-v3-250324'
```

## 项目结构

```
src/
├── components/        # Vue 组件目录
│   ├── DatePicker.vue # 日期选择器组件
│   └── HelloWorld.vue # 示例组件
├── tpl/               # 模板文件目录
│   └── prompt.tpl.ts  # 提示模板文件
├── App.vue           # 根组件
├── main.ts           # 应用入口文件
├── style.css         # 全局样式文件
└── vite-env.d.ts     # Vite 环境类型声明
```
## 开发命令

- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建生产版本
- `pnpm preview` - 预览构建结果

## 功能特点

1. **组件化开发**: 使用 Vue 3 的 Composition API 进行组件开发
2. **TypeScript 支持**: 提供完整的类型安全支持
3. **模板处理**: 集成 Nunjucks 模板引擎，便于处理动态模板
4. **现代化构建**: 利用 Vite 提供快速的开发体验和优化的生产构建

## SSE (Server-Sent Events) 技术详解

### 1. SSE 基本概念

SSE 是一种允许服务器向浏览器推送实时更新的技术。与 WebSocket 不同，SSE 是单向的（服务器到客户端），基于 HTTP 协议，实现相对简单。

### 2. 代码中的 SSE 实现分析

在 App.vue 中，SSE 的实现主要体现在以下几个部分：

#### 数据流处理
```typescript
const response = await fetch(endpoint, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify({
    model,
    messages: [
      { role: 'system', content: prompt },
      { role: 'user', content: "介绍今天相关的知识" }
    ],
    stream: true, // 关键参数：启用流式响应
  })
});
```


#### 流式数据读取
```typescript
const reader = response.body?.getReader();
const decoder = new TextDecoder();
let done = false;
let buffer = '';
reply.value = '';

while (!done) {
  // 逐步读取响应数据
  const { value, done: doneReading } = await (reader?.read() as Promise<{ value: any; done: boolean }>);
  done = doneReading;
  const chunkValue = buffer + decoder.decode(value);
  
  // 处理数据块
  // ...
}
```


#### SSE 数据格式解析
```typescript
const lines = chunkValue.split('\n').filter((line) => line.startsWith('data: '));

for (const line of lines) {
  const incoming = line.slice(6); // 移除 'data: ' 前缀
  if (incoming === '[DONE]') {
    done = true;
    break;
  }
  try {
    const data = JSON.parse(incoming);
    const delta = data.choices[0].delta.content;
    if (delta) reply.value += delta; // 实时更新回复内容
  } catch (ex) {
    buffer += incoming + '\n';
  }
}
```

### 3. 技术要点说明

#### 流式响应处理
- 使用 `response.body?.getReader()` 获取响应的 readable stream
- 通过循环读取方式逐步处理数据，而非等待完整响应
- 实现了类似打字机效果的实时内容展示

#### SSE 数据格式
- 每条消息以 `data: ` 开头
- 数据结束标记为 `[DONE]`
- 实际内容以 JSON 格式传输

#### 错误处理和缓冲
```typescript
try{
  // ...
} catch (ex) {
  buffer += incoming + '\n'; // 缓冲不完整的数据块
}
```

### 4. 优势与特点

1. **实时性**：内容可以逐字或逐句实时显示，提供更好的用户体验
2. **简单性**：相比 WebSocket，SSE 基于 HTTP，实现更简单
3. **自动重连**：浏览器原生支持断线重连机制
4. **内存效率**：流式处理避免了大内存占用

### 5. 应用场景

该项目使用 SSE 技术实现：
- AI 大模型的流式响应展示
- 实时内容生成和显示
- 类似 ChatGPT 的打字机效果

### 6. 潜在改进点

1. **错误处理**：可以增加更完善的错误处理机制
2. **连接状态管理**：添加连接状态提示（如加载中、已完成等）
3. **取消机制**：提供用户中断请求的能力
4. **重试机制**：在网络不稳定时提供重试功能
