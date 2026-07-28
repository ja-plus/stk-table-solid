import { build } from 'vitepress';

// 构建完成后主动退出进程，避免残留 worker 导致进程挂起。
const root = process.argv[2] || 'docs-src';

try {
    await build(root);
} catch (err) {
    console.error(err);
    process.exit(1);
}

// 留出极短窗口让管道中的剩余输出冲刷完毕，再强制退出
setTimeout(() => process.exit(0), 100);
