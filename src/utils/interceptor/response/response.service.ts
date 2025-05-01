import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ResponseData } from "@utils/enum/response";
import { map, Observable } from "rxjs";

export interface Response<T> {
	data: T;
}

@Injectable()
export class ResponseInterceptorService<T> implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
		return next.handle().pipe(map((data) => (data)));
	}
}
