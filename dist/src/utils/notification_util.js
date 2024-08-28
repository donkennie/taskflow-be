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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationUtil = void 0;
const nodemailer = __importStar(require("nodemailer"));
const bull_1 = __importDefault(require("bull"));
class NotificationUtil {
    static transporter;
    static from;
    static emailQueue = new bull_1.default('emailQueue', 'redis://127.0.0.1:6379');
    constructor(config) {
        if (!config) {
            throw new Error('Config not provided');
        }
        if (!NotificationUtil.transporter) {
            NotificationUtil.transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: config.email_config.user,
                    pass: config.email_config.password
                }
            });
        }
        NotificationUtil.from = config.email_config.from;
    }
    static async sendEmail(to, subject, body) {
        try {
            const mailOptions = {
                to: to,
                subject: subject,
                html: body
            };
            const status = await NotificationUtil.transporter.sendMail(mailOptions);
            if (status?.messageId) {
                return status.messageId;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.log(`Error while sendEmail => ${error.message}`);
            return false;
        }
    }
    static async enqueueEmail(to, subject, body) {
        console.log('Enqueuing email task');
        console.log(`to: ${to}`);
        console.log(`subject: ${subject}`);
        console.log(`body: ${body}`);
        await NotificationUtil.emailQueue.add({
            from: NotificationUtil.from,
            to,
            subject,
            body
        });
        return true;
    }
}
exports.NotificationUtil = NotificationUtil;
//# sourceMappingURL=notification_util.js.map