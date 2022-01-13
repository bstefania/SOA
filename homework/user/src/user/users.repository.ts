import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto) {
    const { username, name, email, password } = authCredentialsDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.create({
      username,
      name,
      email,
      password: hashedPassword,
    });
    try {
      await this.save(user);
      return name;
    } catch (error) {
      if (error.code === '23505') {
        throw new RpcException({
          message: 'Username already exists',
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
