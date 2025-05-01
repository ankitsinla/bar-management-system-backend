import { Module } from '@nestjs/common';
import { AuthGuardsService } from './guards.service';

@Module({
  providers: [AuthGuardsService],
  exports: [AuthGuardsService]
})
export class GuardsModule { }
