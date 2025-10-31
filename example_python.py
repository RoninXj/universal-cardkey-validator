#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Python 脚本使用卡密模块示例

安装方法：
pip install git+https://github.com/RoninXj/universal-cardkey-validator.git

使用方法：
1. 安装模块（见上方）
2. 设置环境变量 CARD_KEY
3. 运行此脚本

示例：
export CARD_KEY=your_card_key_here
python3 example_python.py

或在 Windows 上：
set CARD_KEY=your_card_key_here
python example_python.py
"""

import os
import time
from cardkey_validator import initialize_card_key_validator, get_card_key_validator, verify_and_add_card_key

def example_basic():
    """示例1：基础使用"""
    print('\n' + '='*50)
    print('示例1：基础使用')
    print('='*50)
    
    # 初始化
    initialize_card_key_validator()
    
    # 获取验证器
    validator = get_card_key_validator()
    
    if not validator:
        print('❌ 卡密验证器未初始化')
        return
    
    # 验证卡密
    result = validator.verify()
    
    if result['success']:
        print('✅ 验证成功')
        print(f'验证数据: {result.get("data", {})}')
    else:
        print(f'❌ 验证失败: {result["message"]}')

def example_with_request():
    """示例2：在请求中使用"""
    print('\n' + '='*50)
    print('示例2：在请求中使用')
    print('='*50)
    
    # 初始化
    initialize_card_key_validator()
    
    # 准备请求数据
    request_data = {
        'user_id': '123',
        'action': 'query',
        'timestamp': int(time.time())
    }
    
    print(f'原始请求数据: {request_data}')
    
    # 验证并添加卡密
    data_with_key = verify_and_add_card_key(request_data)
    
    if data_with_key:
        print(f'添加卡密后: {data_with_key}')
        # 这里可以发送请求
        # response = requests.post(url, json=data_with_key)
    else:
        print('❌ 卡密验证失败')

def example_custom_config():
    """示例3：自定义配置"""
    print('\n' + '='*50)
    print('示例3：自定义配置')
    print('='*50)
    
    # 自定义配置
    initialize_card_key_validator({
        'verify_url': 'https://card.xjyyds.cf/api/verify',
        'cache_timeout': 1800,  # 30分钟
        'custom_params': {
            'app_id': 'python_example',
            'version': '1.0.0'
        },
        'timeout': 15,
        'silent': False
    })
    
    validator = get_card_key_validator()
    
    if validator:
        result = validator.verify()
        
        if result['success']:
            print('✅ 验证成功')
            
            # 获取状态
            status = validator.get_status()
            print(f'验证器状态: {status}')
        else:
            print(f'❌ 验证失败: {result["message"]}')

def example_cache_management():
    """示例4：缓存管理"""
    print('\n' + '='*50)
    print('示例4：缓存管理')
    print('='*50)
    
    initialize_card_key_validator()
    validator = get_card_key_validator()
    
    if not validator:
        return
    
    # 第一次验证
    print('第一次验证...')
    result1 = validator.verify()
    print(f'结果: {result1["success"]}')
    
    # 第二次验证（使用缓存）
    print('\n第二次验证（应该使用缓存）...')
    result2 = validator.verify()
    print(f'结果: {result2["success"]}')
    
    # 清除缓存
    print('\n清除缓存...')
    validator.clear_cache()
    
    # 第三次验证（重新验证）
    print('第三次验证（重新验证）...')
    result3 = validator.verify()
    print(f'结果: {result3["success"]}')

def main():
    """主函数"""
    print('\n' + '='*60)
    print('Python 卡密模块使用示例')
    print('='*60)
    
    # 检查环境变量
    card_key = os.getenv('CARD_KEY') or os.getenv('km')
    
    if not card_key:
        print('\n❌ 错误：未设置环境变量 CARD_KEY 或 km')
        print('\n请先设置环境变量：')
        print('  export CARD_KEY=your_card_key_here')
        print('或')
        print('  export km=your_card_key_here')
        return
    
    print(f'\n✅ 已检测到卡密环境变量')
    print(f'卡密（脱敏）: {card_key[:4]}****{card_key[-4:] if len(card_key) > 8 else "****"}')
    
    # 运行示例
    try:
        example_basic()
        example_with_request()
        example_custom_config()
        example_cache_management()
        
        print('\n' + '='*60)
        print('✅ 所有示例执行完成')
        print('='*60 + '\n')
        
    except Exception as e:
        print(f'\n❌ 执行出错: {str(e)}')
        import traceback
        traceback.print_exc()

if __name__ == '__main__':
    main()
