#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
通用卡密验证模块 - Python 版本

适用于任何需要卡密验证的 Python 脚本项目

特性：
- 通用性强，适用于任何 Python 脚本
- 智能缓存机制
- 完善的错误处理
- 支持自定义配置

作者: Roninxj
版本: 1.0.0
"""

import os
import time
import json
import requests
from typing import Optional, Dict, Any


class CardKeyValidator:
    """卡密验证器类"""
    
    def __init__(self, card_key: str, options: Optional[Dict[str, Any]] = None):
        """
        初始化卡密验证器
        
        Args:
            card_key: 卡密字符串
            options: 配置选项
                - verify_url: 验证接口地址
                - cache_timeout: 缓存超时时间（秒），默认 3600
                - custom_params: 自定义验证参数
                - custom_headers: 自定义请求头
                - timeout: 请求超时时间（秒），默认 10
                - silent: 静默模式，不输出日志
        """
        self.card_key = card_key
        options = options or {}
        
        # 配置
        self.verify_url = options.get('verify_url') or os.getenv('VERIFY_URL', 'https://card.xjyyds.cf/api/verify')
        self.cache_timeout = int(options.get('cache_timeout') or os.getenv('VERIFY_CACHE_TIMEOUT', '3600')) * 1000
        self.custom_params = options.get('custom_params', {})
        self.custom_headers = options.get('custom_headers', {})
        self.timeout = options.get('timeout', 10)
        self.silent = options.get('silent', False)
        
        # 状态
        self.is_verified = False
        self.verify_time = None
        self.verify_result = None
    
    def verify(self) -> Dict[str, Any]:
        """
        验证卡密
        
        Returns:
            验证结果字典:
                - success: 是否成功
                - message: 消息
                - data: 验证数据（成功时）
                - code: 错误代码（失败时）
        """
        # 检查缓存
        if self._is_cache_valid():
            if not self.silent:
                print('✅ 使用缓存的验证结果')
            return self.verify_result
        
        # 发送验证请求
        try:
            if not self.silent:
                print(f'🔑 正在验证卡密...')
            
            # 准备请求数据
            data = {
                'card_key': self.card_key,
                **self.custom_params
            }
            
            # 准备请求头
            headers = {
                'Content-Type': 'application/json',
                **self.custom_headers
            }
            
            # 发送请求
            response = requests.post(
                self.verify_url,
                json=data,
                headers=headers,
                timeout=self.timeout
            )
            
            # 解析响应
            result = response.json()
            
            if result.get('success'):
                self.is_verified = True
                self.verify_time = int(time.time() * 1000)
                self.verify_result = {
                    'success': True,
                    'message': result.get('message', '验证成功'),
                    'data': result.get('data', {})
                }
                
                if not self.silent:
                    print(f'✅ 卡密验证成功')
                
                return self.verify_result
            else:
                self.verify_result = {
                    'success': False,
                    'message': result.get('message', '验证失败'),
                    'code': result.get('code', 'INVALID')
                }
                
                if not self.silent:
                    print(f'❌ 卡密验证失败: {self.verify_result["message"]}')
                
                return self.verify_result
                
        except requests.exceptions.Timeout:
            error_result = {
                'success': False,
                'message': '验证请求超时',
                'code': 'TIMEOUT'
            }
            if not self.silent:
                print(f'❌ {error_result["message"]}')
            return error_result
            
        except requests.exceptions.RequestException as e:
            error_result = {
                'success': False,
                'message': f'网络连接失败: {str(e)}',
                'code': 'NETWORK_ERROR'
            }
            if not self.silent:
                print(f'❌ {error_result["message"]}')
            return error_result
            
        except Exception as e:
            error_result = {
                'success': False,
                'message': f'验证过程出错: {str(e)}',
                'code': 'ERROR'
            }
            if not self.silent:
                print(f'❌ {error_result["message"]}')
            return error_result
    
    def _is_cache_valid(self) -> bool:
        """检查缓存是否有效"""
        if not self.is_verified or not self.verify_time:
            return False
        
        current_time = int(time.time() * 1000)
        age = current_time - self.verify_time
        return age < self.cache_timeout
    
    def get_status(self) -> Dict[str, Any]:
        """
        获取验证器状态
        
        Returns:
            状态信息字典
        """
        return {
            'is_verified': self.is_verified,
            'verify_time': self.verify_time,
            'cache_valid': self._is_cache_valid(),
            'card_key': self._mask_card_key()
        }
    
    def clear_cache(self):
        """清除缓存"""
        self.is_verified = False
        self.verify_time = None
        self.verify_result = None
        if not self.silent:
            print('🔄 缓存已清除')
    
    def _mask_card_key(self) -> str:
        """脱敏显示卡密"""
        if len(self.card_key) <= 8:
            return '*' * len(self.card_key)
        return self.card_key[:4] + '*' * (len(self.card_key) - 8) + self.card_key[-4:]


# 全局验证器实例
_global_validator: Optional[CardKeyValidator] = None


def initialize_card_key_validator(options: Optional[Dict[str, Any]] = None) -> Optional[CardKeyValidator]:
    """
    初始化全局卡密验证器
    
    Args:
        options: 配置选项
            - required: 是否必须提供卡密，默认 True
            - verify_url: 验证接口地址
            - cache_timeout: 缓存超时时间（秒）
            - custom_params: 自定义验证参数
            - custom_headers: 自定义请求头
            - timeout: 请求超时时间（秒）
            - silent: 静默模式
            - env_keys: 环境变量键名列表，默认 ['CARD_KEY', 'km']
    
    Returns:
        CardKeyValidator 实例或 None
    """
    global _global_validator
    
    options = options or {}
    required = options.get('required', True)
    env_keys = options.get('env_keys', ['CARD_KEY', 'km'])
    silent = options.get('silent', False)
    
    # 从环境变量获取卡密
    card_key = None
    for key in env_keys:
        card_key = os.getenv(key)
        if card_key:
            break
    
    if not card_key:
        if required:
            if not silent:
                print(f'❌ 未找到卡密环境变量（尝试的键名: {", ".join(env_keys)}）')
            return None
        else:
            if not silent:
                print('⚠️ 未提供卡密，跳过验证')
            return None
    
    # 创建验证器
    _global_validator = CardKeyValidator(card_key, options)
    
    if not silent:
        print(f'🔑 卡密验证器已初始化')
    
    return _global_validator


def get_card_key_validator() -> Optional[CardKeyValidator]:
    """
    获取全局卡密验证器实例
    
    Returns:
        CardKeyValidator 实例或 None
    """
    return _global_validator


def create_card_key_validator(card_key: str, options: Optional[Dict[str, Any]] = None) -> CardKeyValidator:
    """
    创建新的卡密验证器实例（不使用全局实例）
    
    Args:
        card_key: 卡密
        options: 配置选项
    
    Returns:
        CardKeyValidator 实例
    """
    return CardKeyValidator(card_key, options)


def verify_and_add_card_key(request_data: Dict[str, Any], 
                            validator: Optional[CardKeyValidator] = None) -> Optional[Dict[str, Any]]:
    """
    验证卡密并添加到请求数据中
    
    Args:
        request_data: 原始请求数据
        validator: 验证器实例，默认使用全局实例
    
    Returns:
        添加了卡密的请求数据，验证失败返回 None
    """
    validator = validator or _global_validator
    
    if not validator:
        print('❌ 卡密验证器未初始化')
        return None
    
    result = validator.verify()
    
    if not result['success']:
        return None
    
    return {
        **request_data,
        'card_key': validator.card_key
    }


def add_card_key_to_request(request_data: Dict[str, Any],
                            validator: Optional[CardKeyValidator] = None) -> Dict[str, Any]:
    """
    直接添加卡密到请求数据（不验证）
    
    Args:
        request_data: 原始请求数据
        validator: 验证器实例，默认使用全局实例
    
    Returns:
        添加了卡密的请求数据
    """
    validator = validator or _global_validator
    
    if not validator:
        print('❌ 卡密验证器未初始化')
        return request_data
    
    return {
        **request_data,
        'card_key': validator.card_key
    }


# 示例用法
if __name__ == '__main__':
    # 设置环境变量（实际使用时应该在系统环境变量中设置）
    os.environ['CARD_KEY'] = 'your_card_key_here'
    
    # 初始化
    initialize_card_key_validator()
    
    # 获取验证器
    validator = get_card_key_validator()
    
    if validator:
        # 验证卡密
        result = validator.verify()
        
        if result['success']:
            print('✅ 验证成功，可以继续执行脚本')
            
            # 获取状态
            status = validator.get_status()
            print(f'状态: {status}')
            
            # 在请求中使用
            request_data = {'user_id': '123', 'action': 'query'}
            data_with_key = verify_and_add_card_key(request_data)
            print(f'请求数据: {data_with_key}')
        else:
            print('❌ 验证失败，退出脚本')
