import type { UserRole } from '@replyiq/database';

export interface JwtPayload {
  sub: string;
  email: string;
  organizationId: string;
  role: UserRole;
  sessionId: string;
}
