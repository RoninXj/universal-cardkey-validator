/**
 * 通用卡密验证模块
 * 适用于任何需要卡密验证的脚本项目
 * 
 * 特性：
 * - 支持自定义验证接口
 * - 支持缓存机制，减少验证请求
 * - 支持多种环境变量配置
 * - 支持自定义请求参数
 * - 完善的错误处理
 * 
 * @author Roninxj
 * @version 1.0.0
 * @license MIT
 */

const request = require("request");

/**
 * 卡密验证器类
 */
class CardKeyValidator {
    /**
     * 创建卡密验证器实例
     * @param {string} cardKey - 卡密
     * @param {Object} options - 配置选项
     * @param {string} options.verifyUrl - 验证接口地址
     * @param {number} options.cacheTimeout - 缓存超时时间（秒）
     * @param {Object} options.customParams - 自定义验证参数
     * @param {Object} options.customHeaders - 自定义请求头
     * @param {number} options.timeout - 请求超时时间（毫秒）
     * @param {boolean} options.silent - 静默模式，不输出日志
     */
    constructor(cardKey, options = {}) {
        this.cardKey = cardKey;
        this.verifyUrl = options.verifyUrl || process.env.VERIFY_URL || "https://card.xjyyds.cf/api/verify";
        this.cacheTimeout = parseInt(options.cacheTimeout || process.env.VERIFY_CACHE_TIMEOUT || "3600", 10) * 1000;
        this.customParams = options.customParams || {};
        this.customHeaders = options.customHeaders || {};
        this.timeout = options.timeout || 10000;
        this.silent = options.silent || false;

        this.isVerified = false;
        this.verifyTime = null;
        this.verifyResult = null;
    }

    /**
     * 验证卡密
     * @returns {Promise<Object>} 验证结果
     */
    async verify() {
        // 检查缓存
        if (this.isCacheValid()) {
            if (this._isDevMode() && !this.silent) {
                console.log("[卡密模块] 使用缓存的验证结果");
            }
            return this.verifyResult;
        }

        // 发送验证请求
        const result = await this.sendVerifyRequest();

        // 更新缓存
        if (result.success) {
            this.isVerified = true;
            this.verifyTime = Date.now();
            this.verifyResult = result;

            if (!this.silent) {
                console.log("✅ 卡密验证成功");
            }

            if (this._isDevMode() && !this.silent && result.data) {
                console.log("[卡密模块] 状态: " + (result.data.status || "未知"));
                if (result.data.expire_time) {
                    console.log("[卡密模块] 到期时间: " + result.data.expire_time);
                }
                if (result.data.remaining_calls !== undefined && result.data.remaining_calls !== null) {
                    console.log("[卡密模块] 剩余调用次数: " + result.data.remaining_calls);
                }
            }
        } else if (!this.silent) {
            console.log("❌ 卡密验证失败: " + result.message);
        }

        return result;
    }

    /**
     * 检查缓存是否有效
     * @returns {boolean}
     */
    isCacheValid() {
        if (!this.isVerified || !this.verifyTime) {
            return false;
        }
        return (Date.now() - this.verifyTime) < this.cacheTimeout;
    }

    /**
     * 发送验证请求
     * @returns {Promise<Object>}
     */
    async sendVerifyRequest() {
        try {
            const requestBody = {
                card_key: this.cardKey,
                ...this.customParams
            };

            const response = await new Promise((resolve, reject) => {
                request({
                    method: "POST",
                    url: this.verifyUrl,
                    headers: {
                        "Content-Type": "application/json",
                        "User-Agent": "CardKeyValidator/1.0",
                        ...this.customHeaders
                    },
                    body: JSON.stringify(requestBody),
                    timeout: this.timeout
                }, (error, response, body) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    if (!response || response.statusCode !== 200) {
                        reject(new Error("验证服务返回异常状态码: " + (response ? response.statusCode : "无响应")));
                        return;
                    }

                    try {
                        resolve(JSON.parse(body));
                    } catch (parseError) {
                        reject(new Error("验证服务响应格式错误"));
                    }
                });
            });

            // 标准响应格式：{ success: true, code: 200, message: "", data: {} }
            if (response && response.success === true && response.code === 200) {
                return {
                    success: true,
                    message: response.message || "验证成功",
                    data: response.data || {},
                    raw: response
                };
            }

            return {
                success: false,
                message: response.message || "卡密验证失败",
                code: response.code || "UNKNOWN",
                raw: response
            };
        } catch (error) {
            return {
                success: false,
                message: "网络连接失败: " + error.message,
                code: "NETWORK_ERROR",
                error: error
            };
        }
    }

    /**
     * 获取验证器状态
     * @returns {Object}
     */
    getStatus() {
        return {
            isVerified: this.isVerified,
            verifyTime: this.verifyTime,
            cacheValid: this.isCacheValid(),
            cardKey: this.cardKey ? "***" + this.cardKey.slice(-4) : null
        };
    }

    /**
     * 清除缓存
     */
    clearCache() {
        this.isVerified = false;
        this.verifyTime = null;
        this.verifyResult = null;
    }

    /**
     * 检查是否为开发模式
     * @private
     */
    _isDevMode() {
        return process.env.DEV_MODE === "1" || process.env.DEV_MODE === "true";
    }
}

// 全局卡密验证器实例
let globalCardKeyValidator = null;

/**
 * 初始化卡密验证器
 * @param {Object} options - 配置选项
 * @param {boolean} options.required - 是否必须提供卡密，默认 true
 * @param {string} options.verifyUrl - 验证接口地址
 * @param {number} options.cacheTimeout - 缓存超时时间（秒）
 * @param {Object} options.customParams - 自定义验证参数
 * @param {Object} options.customHeaders - 自定义请求头
 * @param {number} options.timeout - 请求超时时间（毫秒）
 * @param {boolean} options.silent - 静默模式
 * @param {string[]} options.envKeys - 环境变量键名列表，默认 ['CARD_KEY', 'km']
 * @returns {CardKeyValidator|null} 验证器实例或 null
 */
function initializeCardKeyValidator(options = {}) {
    const required = options.required !== false; // 默认为 true
    const envKeys = options.envKeys || ['CARD_KEY', 'km'];

    // 从环境变量中获取卡密
    let cardKey = null;
    for (const key of envKeys) {
        cardKey = (process.env[key] || "").trim();
        if (cardKey) break;
    }

    if (!cardKey) {
        if (required) {
            console.log("❌ 错误: 未配置卡密，请设置环境变量: " + envKeys.join(" 或 "));
            console.log("   示例: export " + envKeys[0] + "=your_card_key_here");
            process.exit(1);
        } else {
            if (!options.silent) {
                console.log("⚠️ 警告: 未配置卡密，将跳过卡密验证");
            }
            return null;
        }
    }

    globalCardKeyValidator = new CardKeyValidator(cardKey, options);

    if (!options.silent) {
        console.log("🔑 卡密验证器已初始化");
    }

    return globalCardKeyValidator;
}

/**
 * 获取全局卡密验证器实例
 * @returns {CardKeyValidator|null}
 */
function getCardKeyValidator() {
    return globalCardKeyValidator;
}

/**
 * 创建新的卡密验证器实例（不使用全局实例）
 * @param {string} cardKey - 卡密
 * @param {Object} options - 配置选项
 * @returns {CardKeyValidator}
 */
function createCardKeyValidator(cardKey, options = {}) {
    return new CardKeyValidator(cardKey, options);
}

/**
 * 辅助函数：为请求添加卡密参数
 * @param {Object} requestData - 原始请求数据
 * @param {CardKeyValidator} validator - 验证器实例（可选，默认使用全局实例）
 * @returns {Object} 添加了卡密的请求数据
 */
function addCardKeyToRequest(requestData, validator = null) {
    const v = validator || globalCardKeyValidator;
    if (!v) {
        throw new Error("卡密验证器未初始化");
    }

    return {
        ...requestData,
        card_key: v.cardKey
    };
}

/**
 * 辅助函数：验证并添加卡密到请求
 * @param {Object} requestData - 原始请求数据
 * @param {CardKeyValidator} validator - 验证器实例（可选，默认使用全局实例）
 * @returns {Promise<Object|null>} 添加了卡密的请求数据，验证失败返回 null
 */
async function verifyAndAddCardKey(requestData, validator = null) {
    const v = validator || globalCardKeyValidator;
    if (!v) {
        console.log("❌ 卡密验证器未初始化");
        return null;
    }

    const verifyResult = await v.verify();
    if (!verifyResult.success) {
        console.log("❌ 卡密验证失败: " + verifyResult.message);
        return null;
    }

    return addCardKeyToRequest(requestData, v);
}

// 导出
module.exports = {
    CardKeyValidator,
    initializeCardKeyValidator,
    getCardKeyValidator,
    createCardKeyValidator,
    addCardKeyToRequest,
    verifyAndAddCardKey
};
