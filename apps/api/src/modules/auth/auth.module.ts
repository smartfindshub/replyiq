import { Module } from '@nestjs/common';
import { SecurityModule } from '../../infrastructure/security/security.module.js';
import { SessionModule } from '../../infrastructure/security/session/session.module.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { WorkspaceProvisioningService } from './workspace-provisioning.service.js';
import { JwtStrategy } from './jwt.strategy.js';

@Module({
  imports: [SecurityModule, SessionModule],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, WorkspaceProvisioningService],
})
export class AuthModule {}
