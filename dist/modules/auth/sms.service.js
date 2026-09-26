"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var SmsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let SmsService = SmsService_1 = class SmsService {
    logger = new common_1.Logger(SmsService_1.name);
    async sendVerificationCode(phone, otp) {
        const privateKey = process.env.PLASGATE_PRIVATE_KEY;
        const secret = process.env.PLASGATE_SECRET;
        const sender = process.env.PLASGATE_SENDER;
        if (!privateKey || !secret || !sender) {
            throw new common_1.ServiceUnavailableException('SMS delivery is not configured');
        }
        try {
            const resp = await axios_1.default.post('https://cloudapi.plasgate.com/rest/send', {
                sender,
                to: phone,
                content: `Your Cafe System verification code is #ma#${otp}#ma#. It expires in 5 minutes.`,
            }, {
                params: { private_key: privateKey },
                headers: { 'Content-Type': 'application/json', 'X-Secret': secret },
                timeout: 10_000,
            });
            this.logger.log(`Plasgate response: ${JSON.stringify(resp.data)}`);
        }
        catch (error) {
            this.logger.error(`Plasgate error: status=${error?.response?.status} body=${JSON.stringify(error?.response?.data)}`);
            throw new common_1.ServiceUnavailableException('Unable to send the verification code. Please try again.');
        }
    }
};
exports.SmsService = SmsService;
exports.SmsService = SmsService = SmsService_1 = __decorate([
    (0, common_1.Injectable)()
], SmsService);
//# sourceMappingURL=sms.service.js.map