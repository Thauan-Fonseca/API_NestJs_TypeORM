import { IsJWT, IsString, IsStrongPassword } from 'class-validator';

export class AuthResetDTO {
  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @IsJWT()
  token: string;
}
