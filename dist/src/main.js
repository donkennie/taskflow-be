"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const numCPUs = os_1.default.cpus().length;
const express_server_1 = require("./express_server");
const db_1 = require("./utils/db");
const ddl_util_1 = require("./utils/ddl_util");
const args = process.argv.slice(2);
if (cluster_1.default.isPrimary) {
    console.log(`Master process PID: ${process.pid}`);
    if (args.length > 0 && args[0] === '--init') {
        (async () => {
            await db_1.DatabaseUtil.getInstance();
            await ddl_util_1.DDLUtil.addDefaultRole();
            await ddl_util_1.DDLUtil.addDefaultUser();
            process.exit();
        })();
    }
    else {
        for (let i = 0; i < numCPUs; i++) {
            cluster_1.default.fork();
        }
        cluster_1.default.on('exit', (worker, code, signal) => {
            console.log(`Worker process ${worker.process.pid} exited with code ${code} and signal ${signal}`);
            setTimeout(() => {
                cluster_1.default.fork();
            }, 1000);
        });
    }
}
else {
    const server = new express_server_1.ExpressServer();
    new db_1.DatabaseUtil();
    process.on('uncaughtException', (error) => {
        console.error(`Uncaught exception in worker process ${process.pid}:`, error);
        server.closeServer();
        setTimeout(() => {
            cluster_1.default.fork();
            cluster_1.default.worker?.disconnect();
        }, 1000);
    });
    process.on('SIGINT', () => {
        console.log('Received SIGINT signal');
        server.closeServer();
    });
    process.on('SIGTERM', () => {
        console.log('Received SIGTERM signal');
        server.closeServer();
    });
}
//# sourceMappingURL=main.js.map