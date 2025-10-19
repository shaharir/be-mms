import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Roles } from './role/roles.decorator';
import { Role } from './enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guards/roles.guard';
import { Types } from 'mongoose';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string } | undefined> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Get('/profile')
  @Roles(Role.Manager, Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async getUser(@Req() req: { user: { _id: Types.ObjectId } }) {
    return this.authService.findUser(req.user._id);
  }
}
