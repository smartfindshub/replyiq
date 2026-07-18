import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports -- value imports required for emitDecoratorMetadata DI
import { WorkspaceProvisioningService } from './workspace-provisioning.service.js';
import type { RegisterWorkspaceResponse } from './workspace-provisioning.service.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports -- value imports required for emitDecoratorMetadata DI
import { AuthService } from './auth.service.js';
import type { LoginResponse } from './auth.service.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports -- value imports required for emitDecoratorMetadata DI
import { RegisterWorkspaceDto } from './dto/register-workspace.dto.js';
// eslint-disable-next-line @typescript-eslint/consistent-type-imports -- value imports required for emitDecoratorMetadata DI
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly workspaceProvisioningService: WorkspaceProvisioningService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(
    @Body() dto: RegisterWorkspaceDto,
  ): Promise<RegisterWorkspaceResponse> {
    return this.workspaceProvisioningService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(dto);
  }
}
