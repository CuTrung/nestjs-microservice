export enum LogLevel {
  INFO = 'info',
  ERROR = 'error',
  WARN = 'warn',
  DEBUG = 'debug',
}

export enum ConsoleType {
  CONSOLE = 'console',
  FILE = 'file',
}

export enum Environments {
  DEVELOPMENT = 'development',
  TESTING = 'testing',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export enum HttpHeaders {
  VERSION = 'x-version',
  REQUEST_ID = 'x-request-id',
}

export enum RmqQueue {
  NESTJS_MICROSERVICE_SEND = 'nestjs_microservice_send_queue',
  NESTJS_MICROSERVICE_RECEIVE = 'nestjs_microservice_receive_queue',
}
