import { User, UserRoleEnum, UserStatusEnum } from '@modules/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }

  async onModuleInit() {
    await this.seed(); // Ensure the seeding process is called after module initialization
  }

  async seed() {
    //   const userRepository = this.dataSource.getRepository(User);
    //   const productCategory = this.dataSource.getRepository(ProductCategory);
    //   const roleRepository = this.dataSource.getRepository(Roles);

    //   // Check if users already exist
    //   const userCount = await userRepository.count();
    //   if (userCount === 0) {
    //     // Insert data into the User table
    //     const roleData = new Roles("ADMIN","ADMIN");
    //     const role = await roleRepository.save(roleData);

    //     const hashedPassword = await bcrypt.hash("password", 10); // Replace with your password

    //     const adminUser = new User('admin', "admin", hashedPassword, UserStatusEnum.ACTIVE,role);

    //     // Save the users into the database
    //     await userRepository.save(adminUser);

    //     const category =  new ProductCategory("LIQUOR");
    //     await productCategory.save(category);
    //     console.log('Users inserted!');

    //     console.log('Posts inserted!');
    //   } else {
    //     console.log('Data already exists!');
    //   }
    const userCount = await this.userModel.countDocuments();
    if (userCount === 0) {
      // Create hashed password
      const hashedPassword = await bcrypt.hash('password', 10); // Use a secure password here

      // Insert the user with the role reference
      const adminUser = new this.userModel({
        name: 'admin',
        username: 'admin',
        password: hashedPassword,
        status: UserStatusEnum.ACTIVE,
        role: UserRoleEnum.ADMIN
      });

      await adminUser.save(); // Save user in MongoDB
      console.log('Admin user inserted!');
    } else {
      console.log('Roles already exist!');
    }
  }
}
