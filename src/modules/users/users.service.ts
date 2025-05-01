import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CommonUtilityService } from '@utils/common/common-utility/common-utility.service';
import { User, UserRoleEnum, UserStatusEnum } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDaoService } from '@modules/dao/user-dao/user-dao.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly commonUtilityService: CommonUtilityService,
    private readonly userDaoService: UserDaoService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    const user = await this.userDaoService.getUserByUsername(
      username,
      UserStatusEnum.ACTIVE,
    );
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = this.commonUtilityService.generateJWT(
        user.id.toString(),
        username,
        user.role,
      );
      return { accessToken };
    }
    throw new UnauthorizedException('Missing or invalid authorization header');
  }

  async create(
    createUserDto: CreateUserDto,
    request,
  ): Promise<Record<string, any>> {
    const user = request.user;
    this.commonUtilityService.validateUserRole(user.role, [UserRoleEnum.ADMIN]);
    const { name, username, password, role } = createUserDto;
    const hashedPassword =
      await this.commonUtilityService.getHashedPassword(password);
    const userExist = await this.userDaoService.getUserByUsername(
      username,
      UserStatusEnum.ACTIVE,
    );
    if (userExist)
      throw new HttpException('Username already exist.', HttpStatus.CONFLICT);
    const newUserData = await this.userDaoService.createNewUser(
      name,
      username,
      hashedPassword,
      role,
    );
    const { password: _password, ...response } = newUserData.toJSON();
    return response;
  }

  async findAll() {
    const allUsers = await this.userDaoService.getAllUsers();
    return allUsers;
  }

  async findOne(id: string) {
    const user = await this.userDaoService.getUserById(id);
    if (!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
