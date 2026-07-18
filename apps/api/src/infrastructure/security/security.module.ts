import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PasswordService } from '../../common/security/password.service.js';
import { TokenService } from '../../common/security/token.service.js';
import { SessionModule } from './session/session.module.js';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
      }),
      inject: [ConfigService],
    }),
    SessionModule,
  ],
  providers: [PasswordService, TokenService],
  exports: [PasswordService, TokenService, JwtModule, SessionModule],
})
export class SecurityModule {}
