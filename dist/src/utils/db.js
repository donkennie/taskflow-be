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
exports.DatabaseUtil = void 0;
const typeorm_1 = require("typeorm");
const config = __importStar(require("../../server_config.json"));
class DatabaseUtil {
    server_config = config;
    constructor() {
        this.connectDatabase();
    }
    connectDatabase() {
        try {
            const db_config = this.server_config.db_config;
            const AppDataSource = new typeorm_1.DataSource({
                type: 'postgres',
                host: db_config.host,
                port: db_config.port,
                username: db_config.username,
                password: db_config.password,
                database: db_config.dbname,
                entities: [],
                synchronize: true,
                logging: false,
            });
            AppDataSource.initialize()
                .then(() => {
                console.log('Connected to the database');
            })
                .catch((error) => console.log(error));
        }
        catch (error) {
            console.error('Error connecting to the database:', error);
        }
    }
}
exports.DatabaseUtil = DatabaseUtil;
