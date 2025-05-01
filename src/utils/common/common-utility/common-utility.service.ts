import { UserRoleEnum } from '@modules/users/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CommonUtilityService {
  async getHashedPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10); // Replace with your password
    return hashedPassword;
  }

  generateJWT(userId: string, username: string, role: string) {
    return jwt.sign(
      { sub: userId, username: username, role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );
  }

  validateUserRole(userRole: UserRoleEnum, validRoles: UserRoleEnum[]) {
    let isValidUser = false;
    validRoles.forEach((validRole) => {
      if (userRole == validRole) isValidUser = true;
    });
    if (!isValidUser) {
      throw new UnauthorizedException('Not authorized.');
    }
  }
}
