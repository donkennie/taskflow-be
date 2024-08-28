"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheUtil = void 0;
const redis = __importStar(require("redis"));
class CacheUtil {
    static client = redis.createClient();
    constructor() {
        CacheUtil.client.connect();
    }
    static async get(cacheName, key) {
        try {
            const data = await CacheUtil.client.json.get(`${cacheName}:${key}`);
            return data;
        }
        catch (err) {
            console.error(`Error getting cache: ${err}`);
            return null;
        }
    }
    static async set(cacheName, key, value) {
        try {
            await CacheUtil.client.json.set(`${cacheName}:${key}`, '.', value);
        }
        catch (err) {
            console.error(`Error setting cache: ${err}`);
        }
    }
    static async remove(cacheName, key) {
        try {
            await CacheUtil.client.del(`${cacheName}:${key}`);
        }
        catch (err) {
            console.error(`Error deleting cache: ${err}`);
        }
    }
}
exports.CacheUtil = CacheUtil;
//# sourceMappingURL=cache_util.js.map