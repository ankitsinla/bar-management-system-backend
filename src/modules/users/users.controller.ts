import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuardsService } from '@modules/guards/guards.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.usersService.login(loginUserDto);
  }

  @Post('create')
  @UseGuards(AuthGuardsService)
  async create(@Body() createUserDto: CreateUserDto, @Request() request: any) {
    return await this.usersService.create(createUserDto, request);
  }

  @Get()
  @UseGuards(AuthGuardsService)
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuardsService)
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }
}
