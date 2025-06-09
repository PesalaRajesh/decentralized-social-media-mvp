// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('verify')
  verify(@Body() body: { address: string; signature: string; message: string }) {
    return this.authService.verifySignature(body.address, body.signature, body.message);
  }
}