import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}
  create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(newUser);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateUser = await this.usersRepository.findOne({ where: { id } });

    if (!updateUser) {
      throw new HttpException(`User ${id} not found`, HttpStatus.PRECONDITION_FAILED);
    }

    updateUser.username = updateUserDto.username;
    updateUser.email = updateUserDto.email;
    updateUser.password = updateUserDto.password;
    return this.usersRepository.save(updateUser);
  }

  async remove(id: number) {
    const removeUser = await this.usersRepository.findOne({ where: { id } });

    if (!removeUser) {
      throw new HttpException(`User ${id} not found`, HttpStatus.PRECONDITION_FAILED);
    }

    return this.usersRepository.remove(removeUser);
  }
}
