import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

// 配置常量
const TARGET_DIR = '../posts' // 默认扫描目录
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss' // 日期时间格式
const FIELD_NAME = 'updated' // 要更新的字段名

// 获取当前模块的目录路径
const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * 获取当前格式化的日期时间
 * @returns {string} 格式化后的日期时间字符串
 */
function getCurrentDateTime() {
    const now = new Date()
    const pad = num => String(num).padStart(2, '0')
    
    return DATE_FORMAT
        .replace('YYYY', now.getFullYear())
        .replace('MM', pad(now.getMonth() + 1))
        .replace('DD', pad(now.getDate()))
        .replace('HH', pad(now.getHours()))
        .replace('mm', pad(now.getMinutes()))
        .replace('ss', pad(now.getSeconds()))
}

/**
 * 处理单个 Markdown 文件
 * @param {string} filePath 文件路径
 */
async function processMarkdownFile(filePath) {
    try {
        let content = await fs.readFile(filePath, 'utf8')
        let hasFrontMatter = false
        let updatedContent = ''
        
        // 检查是否已有 Front Matter
        if (content.startsWith('---\n')) {
            hasFrontMatter = true
            const frontMatterEnd = content.indexOf('\n---', 4)
            
            if (frontMatterEnd === -1) {
                // 无效的 Front Matter，当作没有处理
                hasFrontMatter = false
            } else {
                // 提取 Front Matter 部分
                const frontMatter = content.slice(4, frontMatterEnd)
                const restContent = content.slice(frontMatterEnd + 4).trimStart()
                
                // 检查是否已有 updated 字段
                if (new RegExp(`^${FIELD_NAME}:`, 'm').test(frontMatter)) {
                    // 更新现有字段
                    updatedContent = frontMatter.replace(
                        new RegExp(`^${FIELD_NAME}:.*$`, 'm'),
                        `${FIELD_NAME}: ${getCurrentDateTime()}`
                    )
                } else {
                    // 添加新字段
                    updatedContent = `${frontMatter}\n${FIELD_NAME}: ${getCurrentDateTime()}`
                }
                
                // 重新组装内容
                content = `---\n${updatedContent}\n---${restContent ? '\n' + restContent : ''}`
            }
        }
        
        // 如果没有 Front Matter，添加一个
        if (!hasFrontMatter) {
            const restContent = content.trimStart()
            content = `---\n${FIELD_NAME}: ${getCurrentDateTime()}\n---${restContent ? '\n' + restContent : ''}`
        }
        
        // 写入文件
        await fs.writeFile(filePath, content, 'utf8')
        console.log(`✅ Updated: ${path.relative(process.cwd(), filePath)}`)
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message)
    }
}

/**
 * 递归扫描目录中的 Markdown 文件
 * @param {string} dir 目录路径
 */
async function scanDirectory(dir) {
    try {
        const files = await fs.readdir(dir)
        
        for (const file of files) {
            const fullPath = path.join(dir, file)
            const stat = await fs.stat(fullPath)
            
            if (stat.isDirectory()) {
                await scanDirectory(fullPath)
            } else if (path.extname(file).toLowerCase() === '.md') {
                await processMarkdownFile(fullPath)
            }
        }
    } catch (error) {
        console.error(`❌ Error scanning directory ${dir}:`, error.message)
    }
}

/**
 * 主函数
 */
async function main() {
    const targetDir = process.argv[2] 
        ? path.resolve(process.argv[2])
        : path.resolve(__dirname, TARGET_DIR)
    
    console.log(`📂 Scanning directory: ${targetDir}`)
    
    try {
        await scanDirectory(targetDir)
        console.log('✨ Update completed successfully!')
    } catch (error) {
        console.error('❌ Update failed:', error.message)
        process.exit(1)
    }
}

// 执行主函数
main().catch(console.error)