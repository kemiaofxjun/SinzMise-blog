// scripts/new-post.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { format } from 'date-fns';

// 获取当前模块的路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const date = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

const title = process.argv[2];
if (!title) {
  console.error('请提供文章标题');
  process.exit(1);
}

const slug = title.toLowerCase().replace(/\s+/g, '-');
const content = `---
title: ${title}
date: ${date}
updated: ${date}
---

## ${title}

开始写作...
`;

const filePath = path.join(__dirname, '../posts', `${slug}.md`);
fs.writeFileSync(filePath, content);
console.log(`文章已创建: ${filePath}`);