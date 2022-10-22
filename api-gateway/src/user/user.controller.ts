import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiQuery, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create user.' })
  @ApiBody({ type: CreateUserDto })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Return the user list.' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Return the user.' })
  @ApiQuery({ name: 'id', required: false, type: String })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Update the user.' })
  @ApiQuery({ name: 'id', required: false, type: String })
  @ApiBody({ type: UpdateUserDto })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<UpdateUserDto>,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete the user.' })
  @ApiQuery({ name: 'id', required: false, type: String })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
