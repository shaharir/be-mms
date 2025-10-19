import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { SignUpDto } from './dto/signup.dto';
import bcrypt from 'node_modules/bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user')
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signupDto: SignUpDto): Promise<{ token: string } | undefined> {
    try {
      const { name, email, password, roles, mobile, roomNo } = signupDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        roles,
        mobile,
        roomNo,
      });
      const token = this.jwtService.sign({ id: user._id, roles: user.roles });

      return { token };
    } catch (error) {
      console.log(error);
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { mobile, password } = loginDto;
    const user = await this.userModel.findOne({ mobile });

    if (!user) {
      throw new UnauthorizedException('Invalid mobile or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async findUser(userId: Types.ObjectId): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
