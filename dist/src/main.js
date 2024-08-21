"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const express_server_1 = require("./express_server");
const db_1 = require("./utils/db");
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
