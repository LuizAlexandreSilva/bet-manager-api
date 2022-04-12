import { Controller, Post, Request } from '@nestjs/common';
import { Public } from 'src/decorators/public';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Public()
  @Post('new')
  async login(@Request() req) {
    return this.userService.create(req.user);
  }
}
