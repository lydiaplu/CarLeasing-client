// # 单元测试与 DOM 环境
// npm i -D jest @swc/jest jest-environment-jsdom

// # React 组件测试
// npm i -D @testing-library/react @testing-library/jest-dom @testing-library/user-event

// # 处理样式与静态资源
// npm i -D identity-obj-proxy

/** @type {import('jest').Config} */
export default {
    testEnvironment: 'jsdom',
    // 让 Jest 认识 JSX/ESM，使用 SWC 转译
    transform: {
        '^.+\\.(j|t)sx?$': ['@swc/jest'],
    },
    // 关键一行：用 V8 做覆盖率
    coverageProvider: 'v8',
    // 若你在 vite.config.js 里用了别名，这里一并映射（示例给出常见写法）
    moduleNameMapper: {
        // 你的样式主要是 SCSS，这里用 identity-obj-proxy 处理（含 .module.scss 也OK）
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',

        // 图片/字体等静态资源（如果有）映射到一个文件 mock
        '\\.(png|jpe?g|gif|webp|avif|svg|ico|bmp|ttf|woff2?)$':
            '<rootDir>/__mocks__/fileMock.js',

        // 如果 vite.config.js 里有 alias（例如 @ => src），保留下面这一行；
        // 如果你没配 alias，就删除这一行。
        '^@/(.*)$': '<rootDir>/src/$1',

        // 也可把以 /assets 开头的导入映射到 src/assets
        '^/assets/(.*)$': '<rootDir>/src/assets/$1',
    },

    // 测试前的全局初始化
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

    // 只在 src 下找测试文件
    testMatch: ['<rootDir>/src/**/*.(test|spec).{js,jsx}'],

    moduleFileExtensions: ['js', 'jsx', 'json'],

    // 某些 ESM 第三方包如果需要转译，在这里放行（按需再加）
    // transformIgnorePatterns: ['/node_modules/(?!nanoid)/'],

    // 覆盖率
    collectCoverageFrom: [
        'src/**/*.{js,jsx}',
        '!src/main.jsx',
        '!src/**/index.{js,jsx}',
    ],
};
