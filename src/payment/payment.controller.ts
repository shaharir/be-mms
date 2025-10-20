import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Roles } from 'src/auth/role/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { User } from 'src/auth/schemas/user.schema';
import { paymentCreateDto } from './dto/payment.dto';
import { Payment } from './schemas/payment.schemas';
interface AuthenticatedRequest extends Request {
  user: User;
}
@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get()
  @Roles(Role.Manager, Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async getAllPayments(): Promise<Payment[]> {
    return this.paymentService.findAll();
  }

  @Post()
  @Roles(Role.Manager, Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async createPayment(
    @Body() payment: paymentCreateDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<Payment> {
    return this.paymentService.paymentCreate(payment, req.user);
  }
}
