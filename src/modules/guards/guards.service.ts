import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthGuardsService implements CanActivate{
    canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const authHeader = request.headers["authorization"];

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			throw new UnauthorizedException("Missing or invalid authorization header");
		}

		const token = authHeader.split(" ")[1];

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			request.user = decoded; // attach decoded token to request
			return true;
		} catch (err) {
			throw new UnauthorizedException("Invalid or expired token");
		}
	}
}
