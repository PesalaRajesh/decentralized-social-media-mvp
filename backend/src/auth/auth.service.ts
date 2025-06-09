// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { verifyMessage } from 'ethers'; // ✅ Import directly

@Injectable()
export class AuthService {
  verifySignature(address: string, signature: string, message: string) {
    const recovered = verifyMessage(message, signature); // ✅ Use directly
    if (recovered.toLowerCase() !== address.toLowerCase()) {
      throw new UnauthorizedException('Invalid signature');
    }
    return { success: true };
  }
}
