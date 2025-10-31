#!/usr/bin/env node
/**
 * Node.js 脚本使用卡密模块示例
 * 
 * 安装方法：
 * npm install github:RoninXj/universal-cardkey-validator#v1.0.2
 * 
 * 使用方法：
 * 1. 安装模块（见上方）
 * 2. 设置环境变量 CARD_KEY
 * 3. 运行此脚本
 * 
 * 示例：
 * export CARD_KEY=your_card_key_here
 * node example_nodejs.js
 * 
 * 或在 Windows 上：
 * set CARD_KEY=your_card_key_here
 * node example_nodejs.js
 */

const { 
    initializeCardKeyValidator, 
    getCardKeyValidator, 
    verifyAndAddCardKey,
    createCardKeyValidator 
} = require('universal-cardkey-validator');

/**
 * 示例1：基础使用
 */
async function exampleBasic() {
    console.log('\n' + '='.repeat(50));
    console.log('示例1：基础使用');
    console.log('='.repeat(50));
    
    // 初始化
    initializeCardKeyValidator();
    
    // 获取验证器
    const validator = getCardKeyValidator();
    
    if (!validator) {
        console.log('❌ 卡密验证器未初始化');
        return;
    }
    
    // 验证卡密
    const result = await validator.verify();
    
    if (result.success) {
        console.log('✅ 验证成功');
        console.log('验证数据:', result.data || {});
    } else {
        console.log(`❌ 验证失败: ${result.message}`);
    }
}

/**
 * 示例2：在请求中使用
 */
async function exampleWithRequest() {
    console.log('\n' + '='.repeat(50));
    console.log('示例2：在请求中使用');
    console.log('='.repeat(50));
    
    // 初始化
    initializeCardKeyValidator();
    
    // 准备请求数据
    const requestData = {
        user_id: '123',
        action: 'query',
        timestamp: Date.now()
    };
    
    console.log('原始请求数据:', requestData);
    
    // 验证并添加卡密
    const dataWithKey = await verifyAndAddCardKey(requestData);
    
    if (dataWithKey) {
        console.log('添加卡密后:', dataWithKey);
        // 这里可以发送请求
        // const response = await axios.post(url, dataWithKey);
    } else {
        console.log('❌ 卡密验证失败');
    }
}

/**
 * 示例3：自定义配置
 */
async function exampleCustomConfig() {
    console.log('\n' + '='.repeat(50));
    console.log('示例3：自定义配置');
    console.log('='.repeat(50));
    
    // 自定义配置
    initializeCardKeyValidator({
        verifyUrl: 'https://card.xjyyds.cf/api/verify',
        cacheTimeout: 1800, // 30分钟
        customParams: {
            app_id: 'nodejs_example',
            version: '1.0.0'
        },
        timeout: 15000,
        silent: false
    });
    
    const validator = getCardKeyValidator();
    
    if (validator) {
        const result = await validator.verify();
        
        if (result.success) {
            console.log('✅ 验证成功');
            
            // 获取状态
            const status = validator.getStatus();
            console.log('验证器状态:', status);
        } else {
            console.log(`❌ 验证失败: ${result.message}`);
        }
    }
}

/**
 * 示例4：缓存管理
 */
async function exampleCacheManagement() {
    console.log('\n' + '='.repeat(50));
    console.log('示例4：缓存管理');
    console.log('='.repeat(50));
    
    initializeCardKeyValidator();
    const validator = getCardKeyValidator();
    
    if (!validator) {
        return;
    }
    
    // 第一次验证
    console.log('第一次验证...');
    const result1 = await validator.verify();
    console.log(`结果: ${result1.success}`);
    
    // 第二次验证（使用缓存）
    console.log('\n第二次验证（应该使用缓存）...');
    const result2 = await validator.verify();
    console.log(`结果: ${result2.success}`);
    
    // 清除缓存
    console.log('\n清除缓存...');
    validator.clearCache();
    
    // 第三次验证（重新验证）
    console.log('第三次验证（重新验证）...');
    const result3 = await validator.verify();
    console.log(`结果: ${result3.success}`);
}

/**
 * 示例5：多账号使用
 */
async function exampleMultipleAccounts() {
    console.log('\n' + '='.repeat(50));
    console.log('示例5：多账号使用');
    console.log('='.repeat(50));
    
    const accounts = [
        { username: 'user1', cardKey: process.env.CARD_KEY || 'test_key_1' },
        { username: 'user2', cardKey: process.env.CARD_KEY || 'test_key_2' }
    ];
    
    for (const account of accounts) {
        console.log(`\n处理账号: ${account.username}`);
        
        const validator = createCardKeyValidator(account.cardKey);
        const result = await validator.verify();
        
        if (result.success) {
            console.log(`✅ ${account.username} 验证成功`);
        } else {
            console.log(`❌ ${account.username} 验证失败: ${result.message}`);
        }
    }
}

/**
 * 示例6：错误处理
 */
async function exampleErrorHandling() {
    console.log('\n' + '='.repeat(50));
    console.log('示例6：错误处理');
    console.log('='.repeat(50));
    
    initializeCardKeyValidator();
    const validator = getCardKeyValidator();
    
    if (!validator) {
        return;
    }
    
    const result = await validator.verify();
    
    if (!result.success) {
        const code = result.code;
        
        switch (code) {
            case 'NETWORK_ERROR':
                console.log('❌ 网络连接失败，请检查网络');
                break;
            case 'EXPIRED':
                console.log('❌ 卡密已过期，请续费');
                break;
            case 'INVALID':
                console.log('❌ 卡密无效');
                break;
            case 'TIMEOUT':
                console.log('❌ 验证请求超时');
                break;
            default:
                console.log(`❌ 验证失败: ${result.message}`);
        }
    } else {
        console.log('✅ 验证成功');
    }
}

/**
 * 主函数
 */
async function main() {
    console.log('\n' + '='.repeat(60));
    console.log('Node.js 卡密模块使用示例');
    console.log('='.repeat(60));
    
    // 检查环境变量
    const cardKey = process.env.CARD_KEY || process.env.km;
    
    if (!cardKey) {
        console.log('\n❌ 错误：未设置环境变量 CARD_KEY 或 km');
        console.log('\n请先设置环境变量：');
        console.log('  export CARD_KEY=your_card_key_here');
        console.log('或');
        console.log('  export km=your_card_key_here');
        console.log('\nWindows 上：');
        console.log('  set CARD_KEY=your_card_key_here');
        return;
    }
    
    console.log('\n✅ 已检测到卡密环境变量');
    const maskedKey = cardKey.length > 8 
        ? `${cardKey.substring(0, 4)}****${cardKey.substring(cardKey.length - 4)}`
        : '****';
    console.log(`卡密（脱敏）: ${maskedKey}`);
    
    // 运行示例
    try {
        await exampleBasic();
        await exampleWithRequest();
        await exampleCustomConfig();
        await exampleCacheManagement();
        await exampleMultipleAccounts();
        await exampleErrorHandling();
        
        console.log('\n' + '='.repeat(60));
        console.log('✅ 所有示例执行完成');
        console.log('='.repeat(60) + '\n');
        
    } catch (error) {
        console.error('\n❌ 执行出错:', error.message);
        console.error(error.stack);
    }
}

// 运行主函数
if (require.main === module) {
    main().catch(error => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
}

module.exports = {
    exampleBasic,
    exampleWithRequest,
    exampleCustomConfig,
    exampleCacheManagement,
    exampleMultipleAccounts,
    exampleErrorHandling
};
