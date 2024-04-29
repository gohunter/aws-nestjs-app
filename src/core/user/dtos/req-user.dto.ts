import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class ReqUserDto {
  @ApiProperty({ example: 'user@domain.com' })
  @IsEmail({}, { message: `El Correo electrónico no es válido.` })
  email: string;

  @ApiProperty()
  @Length(8, 128, {
    message: `La Contraseña debe tener mínimo de 8 y máximo de 128 caracteres.`,
  })
  password: string;

  @ApiProperty({ enum: [1, 2] })
  @IsNumber({}, { message: `El Tipo de documento es requerido.` })
  @IsIn([1, 2], { message: `El Tipo de documento no es válido.` })
  documentType: number;

  @ApiProperty()
  @Length(8, 9, {
    message: `El Número de documento debe tener mínimo de 8 y máximo de 9 caracteres.`,
  })
  @IsNumberString(
    { no_symbols: true },
    { message: 'El Número de documento deben ser solo números.' },
  )
  documentNumber: string;

  @ApiProperty()
  @IsNotEmpty({ message: `Apellidos es requerido.` })
  @IsString({ message: `Apellidos es requerido.` })
  lastName: string;

  @ApiProperty()
  @IsNotEmpty({ message: `Nombres es requerido.` })
  @IsString({ message: `Nombres es requerido.` })
  firstName: string;

  @ApiProperty({ example: '+51966199921' })
  @Type(() => String)
  @Length(9, 12, {
    message:
      'El Número de celuar debe tener mínimo de 9 y máximo de 12 caracteres.',
  })
  @IsPhoneNumber('PE', {
    message: `El Número de celuar debe ser un número válido.`,
  })
  phone: string;
}
