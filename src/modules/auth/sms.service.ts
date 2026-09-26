import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);

  async sendVerificationCode(phone: string, otp: string): Promise<void> {
    const privateKey = process.env.PLASGATE_PRIVATE_KEY;
    const secret = process.env.PLASGATE_SECRET;
    const sender = process.env.PLASGATE_SENDER;

    if (!privateKey || !secret || !sender) {
      throw new ServiceUnavailableException('SMS delivery is not configured');
    }

    try {
      const resp = await axios.post(
        'https://cloudapi.plasgate.com/rest/send',
        {
          sender,
          to: phone,
          // #ma# masks the code in the provider's delivery report.
          content: `Your Cafe System verification code is #ma#${otp}#ma#. It expires in 5 minutes.`,
        },
        {
          params: { private_key: privateKey },
          headers: { 'Content-Type': 'application/json', 'X-Secret': secret },
          timeout: 10_000,
        },
      );
      this.logger.log(`Plasgate response: ${JSON.stringify(resp.data)}`);
    } catch (error: any) {
      this.logger.error(`Plasgate error: status=${error?.response?.status} body=${JSON.stringify(error?.response?.data)}`);
      throw new ServiceUnavailableException('Unable to send the verification code. Please try again.');
    }
  }
}
