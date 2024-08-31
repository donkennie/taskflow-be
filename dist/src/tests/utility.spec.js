"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
chai_1.default.use(chai_http_1.default);
const mocha_1 = require("mocha");
const expect = chai_1.default.expect;
(0, mocha_1.describe)('Array', function () {
    (0, mocha_1.describe)('#indexOf()', function () {
        (0, mocha_1.it)('should return -1 when the value is not present', function () {
            expect([1, 2, 3].indexOf(4)).to.equal(-1);
        });
    });
});
//# sourceMappingURL=utility.spec.js.map