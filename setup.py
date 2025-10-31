#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
通用卡密验证模块 - Python 包配置文件
"""

from setuptools import setup, find_packages

with open("README_PYTHON.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="universal-cardkey-validator",
    version="1.0.0",
    author="Roninxj",
    author_email="",
    description="通用卡密验证模块 - 适用于任何需要卡密验证的 Python 脚本项目",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/RoninXj/universal-cardkey-validator",
    project_urls={
        "Bug Tracker": "https://github.com/RoninXj/universal-cardkey-validator/issues",
        "Documentation": "https://github.com/RoninXj/universal-cardkey-validator#readme",
        "Source Code": "https://github.com/RoninXj/universal-cardkey-validator",
    },
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "Topic :: Software Development :: Libraries :: Python Modules",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Operating System :: OS Independent",
    ],
    py_modules=["cardkey_validator"],
    python_requires=">=3.6",
    install_requires=[
        "requests>=2.20.0",
    ],
    keywords=[
        "cardkey",
        "validator",
        "authentication",
        "verification",
        "qinglong",
        "universal",
        "script",
        "automation",
    ],
    license="MIT",
)
