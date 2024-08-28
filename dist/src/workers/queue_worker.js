"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueWorker = void 0;
const bull_1 = __importDefault(require("bull"));
const notification_util_1 = require("../utils/notification_util");
class QueueWorker {
    static emailQueue = new bull_1.default('emailQueue', 'redis://127.0.0.1:6379');
    static MAX_ATTEMPTS = 4;
    constructor() {
        console.log('Initializing QueueWorker');
    }
    beginProcessing() {
        QueueWorker.emailQueue.process(async (job) => {
            try {
                console.log(`Got a job to send email to ${job.data.to} with subject ${job.data.subject}`);
                const { to, subject, body } = job.data;
                const responseEmail = await notification_util_1.NotificationUtil.sendEmail(to, subject, body);
                if (!responseEmail) {
                }
                console.log(`Email sent to ${to}`);
            }
            catch (error) {
                console.error(`Failed to send email: ${error.message}`);
            }
        });
        QueueWorker.emailQueue.on('failed', async (job, err) => {
            if (job.attemptsMade >= QueueWorker.MAX_ATTEMPTS) {
                console.error(`Job permanently failed for ${job.data.to}: ${err.message}`);
            }
            else {
                console.log(`Retrying job for ${job.data.to}`);
                await job.retry();
            }
        });
    }
}
exports.QueueWorker = QueueWorker;
//# sourceMappingURL=queue_worker.js.map