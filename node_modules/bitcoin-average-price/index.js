// 引入Node.js的https模块来发送HTTP请求
const https = require('https');

// 修改API URL来获取过去7天的比特币数据
const url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7';

// 发送GET请求到CoinGecko API
https.get(url, (res) => {
    let data = '';

    // 接收数据片段并拼接
    res.on('data', (chunk) => {
        data += chunk;
    });

    // 数据接收完成
    res.on('end', () => {
        // 解析JSON数据
        const jsonData = JSON.parse(data);

        // 打印jsonData来检查数据结构
        console.log(jsonData);

        // 确保这里正确地访问了价格数组
        const prices = jsonData.prices;

        if (prices) {
            // 计算价格总和
            const total = prices.reduce((sum, value) => sum + value[1], 0);

            // 计算平均价格
            const averagePrice = total / prices.length;

            // 输出平均价格
            console.log(`过去7天比特币的平均价格为: ${averagePrice.toFixed(2)} USD`);
        } else {
            console.log('未能获取价格数据');
        }
    });
}).on('error', (err) => {
    console.log('Error: ' + err.message);
});
