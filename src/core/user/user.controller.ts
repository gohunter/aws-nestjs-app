import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { ReqUpdUserDto, ReqUserDto } from './dtos';
import { PaginatedResults, PaginationQueryDto } from '@common/models';
import { User } from './entities';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'take', required: false })
  async paginated(
    @Query() query: PaginationQueryDto,
  ): Promise<PaginatedResults<User>> {
    return await this.userService.paginated(query);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getOne(id);
  }

  @Post('add')
  async add(@Body() dto: ReqUserDto) {
    const { email } = dto;
    await this.userService.verifyUserNotExistForRegister(email);
    return await this.userService.createUserProfile(dto);
  }

  @Patch('edit/:id')
  async edit(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ReqUpdUserDto,
  ) {
    if (dto.email) {
      await this.userService.verifyUserNotExistForRegister(dto.email, id);
    }
    return await this.userService.editOneUserProfile(id, dto);
  }

  @Delete('remove/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.remove(id);
  }
}
