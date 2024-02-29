import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { StringService } from '../utils/string/string.service';
import { HttpHeaders } from 'src/consts';
import { IncomingHttpHeaders } from 'http2';

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
