import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';

export const User = createParamDecorator(
  // Os primeiros parâmetros são os campos da requisição que queremos retornar na nossa chamada no controller
  (filter: string[], context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (request.user) {
      if (filter) {
        return { email: request.user[filter[0]], id: request.user[filter[1]] };
      } else {
        return request.user;
      }
    } else {
      throw new NotFoundException(
        'Usuário não encontrado no Request. Use o AuthGuard para obter o usuário',
      );
    }
  },
);
