import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isRabbitContext } from '@golevelup/nestjs-rabbitmq';
import { ApiService } from '../utils/api/api.service';
import { Request, Response } from 'express';
import { HttpHeaders } from 'src/consts';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private apiService: ApiService;
  private context: ExecutionContext;
  private next: CallHandler;

  constructor() {
    if (!this.apiService) this.apiService = new ApiService();
  }

  logging({ message, requestId, payload }) {
    const now = Date.now();
    Logger.log({
      message: `Before ${message}`,
      payload: JSON.stringify(payload),
      requestId,
    });
    return this.next.handle().pipe(
      tap((value) => {
        return Logger.log({
          message: `After ${message}`,
          requestId,
          payload: JSON.stringify(value),
          time: `${Date.now() - now}ms`,
        });
      })
    );
  }
  handleRmq() {
    const { getClient, getData } = this.context.switchToWs();
    const payload = getClient();
    const {
      fields: { exchange, routingKey },
    } = getData();
    return this.logging({
      message: `"[${exchange}]: ${routingKey}"`,
      requestId: payload.headers[HttpHeaders.REQUEST_ID],
      payload,
    });
  }

  handleApi() {
    const { getRequest } = this.context.switchToHttp();
    const req = getRequest<Request>();
    const res = getRequest<Response>();
    return this.logging({
      message: `[${req.path}]`,
      requestId: req.headers[HttpHeaders.REQUEST_ID],
      payload: this.apiService.getPayload(req),
    });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.context = context;
    this.next = next;
    const isRmq = isRabbitContext(context);
    if (isRmq) return this.handleRmq();
    return this.handleApi();
  }
}
