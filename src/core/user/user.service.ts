import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Profile, User } from './entities';
import { ReqUpdUserDto, ReqUserDto } from './dtos';
import { PaginatedResults, PaginationQueryDto } from '@common/models';

@Injectable()
export class UserService {
  readonly codeTypeAuth = 'AuthTokenIntranet';

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async paginated(query: PaginationQueryDto): Promise<PaginatedResults<User>> {
    const [items, totalMatchCount] = await this.userRepository.findAndCount({
      order: {
        audit: {
          createdAt: 'DESC',
        },
      },
      ...query.getTakeAndSkip(),
    });

    return {
      totalMatchCount,
      items,
    };
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) throw new NotFoundException('Usuario no encontrado.');
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: { profile: true },
    });
    if (!user) throw new NotFoundException('Usuario no encontrado.');
    return user;
  }

  async findOne(email: string, navId?: number) {
    return await this.userRepository.findOne({
      where: { email },
      relations: { profile: true },
    });
  }

  async getOne(id: number, userEntity?: User) {
    const user = await this.userRepository
      .findOne({
        where: { id },
        relations: { profile: true },
      })
      .then((u) =>
        !userEntity ? u : !!u && userEntity.id === u.id ? u : null,
      );
    if (!user)
      throw new NotFoundException(`El usuario no existe o no autorizado`);
    return user;
  }

  async verifyUserNotExistForRegister(email: string, userId?: number) {
    const user = await this.findOne(email);

    if (user?.id === userId) return;

    if (user) {
      throw new BadRequestException({
        error: `Bad Request`,
        message: `El Correo electrónico "${email}" se encuentra registrado.`,
      });
    }
  }

  async createUserProfile(dto: ReqUserDto) {
    try {
      const profile = this.profileRepository.create({ ...dto });
      const user = this.userRepository.create({ ...dto, profile });
      const result = await this.userRepository.save(user);
      delete result.password;
      delete result.salt;
      return result;
    } catch (error) {
      throw new BadRequestException({
        error: `Bad Request`,
        message: `Lo sentimos, no se puede crear perfil de usuario.`,
      });
    }
  }

  async editOneUserProfile(id: number, dto: ReqUpdUserDto) {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException({
        error: `Bad Request`,
        message: `Lo sentimos, no se ha recibido datos para actualizar.`,
      });
    }

    const userData = await this.getOne(id);
    const userEdited = Object.assign(userData, { ...dto, profile: { ...dto } });
    try {
      const userEdit = this.userRepository.create(userEdited);
      return await this.userRepository.save(userEdit);
    } catch (error) {
      throw new BadRequestException({
        error: `Bad Request`,
        message: `Lo sentimos, no se puede actualizar datos del usuario ${userData.profile.firstName}.`,
      });
    }
  }

  async remove(id: number) {
    const userData = await this.getOne(id);
    return await this.userRepository.softDelete({ id });
  }
}
