import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(credentials: any) {
    const user = await this.usersService.findByEmail(credentials.email);
    const result = await this.validateUser(
      credentials.email,
      credentials.password,
    );
    if (!user || !result) {
      throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
    }
    const payload = { email: credentials.email, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        email: user.email,
        name: user.name,
      },
    };
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const passwordMatch = await this.compareHash(pass, user.password);

    if (user && passwordMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
