import { Module, Global } from '@nestjs/common';
import { prisma } from '@replyiq/database';

@Global()
@Module({
  providers: [
    {
      provide: 'PRISMA_CLIENT',
      useValue: prisma,
    },
  ],
  exports: ['PRISMA_CLIENT'],
})
export class DatabaseModule {}
