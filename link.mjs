import linkData from "./.vitepress/theme/assets/linkData.mjs";
import { writeFileSync } from "fs";
import { join } from "path";

const allLinkData = linkData.flatMap((item) => item.typeList);

// 创建一个空的 friends 数组
let friends = [];

allLinkData.forEach((link, index) => {
    const username = link.name;  // 提取用户名
    const url = link.url;  // 提取链接
    const avatar = link.avatar || link.ico;  // 提取头像

    // 如果都存在，添加到 friends 数组
    if (username && link && avatar) {
        friends.push({
            name: username,
            link: url,
            avatar: avatar
        });
    }
});

// 根据规定的格式构建 JSON 数据
const friendData = {
    friends: friends.map(item => {
        return [item.name, item.link, item.avatar];
    })
};

// 将 JSON 对象转换为字符串
const friendJSON = JSON.stringify(friendData, null, 2);

// 写入 friend.json 文件到根目录
writeFileSync(join('./public/friend.json'), friendJSON);

console.log('friend.json 文件已生成。');