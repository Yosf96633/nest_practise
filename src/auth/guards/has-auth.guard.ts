import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class HasToken implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  private extractToken(req: Request): string | null {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return null;
    const [type, token] = authorizationHeader.split(' ');
    return type === 'Bearer' ? token : null;
  }
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.extractToken(request);

    if (!token) return true;
    else {
      throw new ForbiddenException();
    }
  }
}
