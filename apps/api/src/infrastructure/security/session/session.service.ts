import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

@Injectable()
export class SessionService {
  generateSessionId(): string {
    return randomUUID();
  }
}
