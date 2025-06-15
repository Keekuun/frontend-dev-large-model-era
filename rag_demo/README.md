# RAG Demo Project

一个基于 TypeScript 的 Node.js 项目模板，用于 RAG（检索增强生成）演示。

## 🚀 特性

- **TypeScript**: 完整的类型支持和严格模式
- **CommonJS**: 兼容性输出格式
- **Jest**: 完整的单元测试框架
- **ESLint + Prettier**: 代码质量和格式化
- **pnpm**: 高效的包管理工具

## 📦 项目结构

```
rag_demo/
├── src/                    # 源代码目录
│   ├── index.ts           # 项目入口文件
│   ├── types/             # 类型定义
│   │   └── index.ts
│   └── utils/             # 工具函数
│       └── index.ts
├── tests/                 # 测试文件目录
│   ├── index.test.ts
│   └── utils.test.ts
├── .trae/                 # 项目配置和记忆库
│   ├── project_rules.md
│   └── memory_bank/
├── dist/                  # 编译输出目录
├── tsconfig.json          # TypeScript 配置
├── jest.config.ts         # Jest 测试配置
├── .eslintrc.js          # ESLint 配置
├── .prettierrc           # Prettier 配置
└── package.json          # 项目依赖配置
```

## 🛠️ 开发环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## 📋 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式运行

```bash
pnpm dev
```

### 构建项目

```bash
pnpm build
```

### 运行生产版本

```bash
pnpm start
```

## 🧪 测试

### 运行所有测试

```bash
pnpm test
```

### 监听模式测试

```bash
pnpm test:watch
```

### 生成测试覆盖率报告

```bash
pnpm test:coverage
```

## 🔧 代码质量

### 代码检查

```bash
pnpm lint
```

### 自动修复代码问题

```bash
pnpm lint:fix
```

### 代码格式化

```bash
pnpm format
```

## 📝 开发规范

- 所有函数必须包含 TypeScript 类型注解
- 所有公共函数必须包含 JSDoc 注释
- 测试覆盖率应保持在 90% 以上
- 使用具名导出，避免默认导出
- 遵循 ESLint 和 Prettier 配置的代码风格

## 🤝 贡献指南

1. 确保所有测试通过
2. 遵循项目的代码规范
3. 为新功能添加相应的测试用例
4. 更新相关文档

## 📄 许可证

ISC License