import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports -- value imports required for emitDecoratorMetadata DI
import { JwtService } from '@nestjs/jwt';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports -- value imports required for emitDecoratorMetadata DI
import { ConfigService } from '@nestjs/config';
import type { StringValue } from 'ms';
import type { JwtPayload } from '../types/jwt-payload.interface.js';
import type { RefreshTokenPayload } from '../types/refresh-token-payload.interface.js';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateAccessToken(payload: JwtPayload): Promise<string> {
    const ttl = this.configService.get<string>('jwt.accessTokenTtl', '15m');
    return this.jwtService.signAsync(payload, {
      expiresIn: ttl as StringValue,
    });
  }

  async generateRefreshToken(payload: RefreshTokenPayload): Promise<string> {
    const secret = this.configService.get<string>('jwt.refreshSecret');
    const ttl = this.configService.get<string>('jwt.refreshTokenTtl', '30d');
    return this.jwtService.signAsync(payload, {
      secret,
      expiresIn: ttl as StringValue,
    });
  }

  async verifyAccessToken<T extends JwtPayload = JwtPayload>(
    token: string,
  ): Promise<T> {
    return this.jwtService.verifyAsync<T>(token);
  }

  async verifyRefreshToken<T extends RefreshTokenPayload = RefreshTokenPayload>(
    token: string,
  ): Promise<T> {
    const secret = this.configService.get<string>('jwt.refreshSecret');
    return this.jwtService.verifyAsync<T>(token, { secret });
  }
}
