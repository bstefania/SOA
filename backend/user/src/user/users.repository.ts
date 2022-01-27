import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto) {
    const { username, name, email, password } = authCredentialsDto;

    console.log(authCredentialsDto)
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.create({
      name,
      email,
      username,
      password: hashedPassword,
    });
    try {
      await this.save(user);
      return name;
    } catch (error) {
      console.log(error)
      if (error.code === '23505') {
        throw new RpcException({
          message: 'Username and/or email already exists',
          code: error.code,
        });
      } else {
        throw new RpcException({
          message: 'Internal server error.',
          code: '500',
        });
      }
    }
  }
}
