import { OmitType, PartialType } from '@nestjs/swagger';
import { ReqUserDto } from './req-user.dto';

export class ReqUpdUserDto extends PartialType(
  OmitType(ReqUserDto, ['password'] as const),
) {}
