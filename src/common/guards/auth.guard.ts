import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { getClient } = context.switchToWs();
    // const isExistsApiKey = request.headers['x-api-key'];
    // if (!isExistsApiKey) throw new UnauthorizedException(`Api key is required`);
    return true;
  }
}
