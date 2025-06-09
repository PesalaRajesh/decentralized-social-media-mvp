// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class AuthService {
  verifySignature(address: string, signature: string, message: string) {
    const recovered = ethers.utils.verifyMessage(message, signature);
    if (recovered.toLowerCase() !== address.toLowerCase()) {
      throw new UnauthorizedException('Invalid signature');
    }
    return { success: true };
  }
}
