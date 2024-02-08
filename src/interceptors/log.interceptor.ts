import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dt = Date.now();
    const request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap(() => {
        console.log(`URL ${request.url}`);
        console.log(`METHOD ${request.method}`);
        console.log(`Execução levou ${Date.now() - dt} milissegundos`);
      }),
    );
  }
}
