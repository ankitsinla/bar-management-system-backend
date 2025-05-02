import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import VariablesConstant from "@utils/constants/variable-constants/variable-constants.service";
import { ResponseData } from "@utils/enum/response";

import { Response } from "express";
import { LoggerDto } from "src/logger/logger.dto";
import { AppLoggerService } from "src/logger/logger.service";

@Catch()
export class CommonExceptionFilter implements ExceptionFilter {
	constructor(private appLoggerService: AppLoggerService) {}

	async catch(exception: any, host: ArgumentsHost) {
		const context = host.switchToHttp();
		if (exception.constructor?.name === BadRequestException.name) {
			return await this.badRequestException(exception, context);
		} else {
			return await this.handleCommonError(exception, context);
		}
	}

	private async badRequestException(exception: any, context: HttpArgumentsHost) {
		const response = context.getResponse<Response>();
		const request = context.getRequest<Request>();
		try {
			const appLoggerDto: LoggerDto = new LoggerDto(
				VariablesConstant.ERROR,
				"error_catch_in_commonexception_filter",
				"UtilsModule",
				"CommonExceptionFilter",
				"catch",
				exception
			);
			appLoggerDto.addMethodAndRequest("", request);
			this.appLoggerService.writeLog(appLoggerDto);
			return response.status(exception.status).send({
				errorMessage: exception.response?.message?.toString() || ResponseData.UNKNOWN_ERROR_OCCURRED["errorMessage"],
			});
		} catch (e) {
			const appLoggerDto: LoggerDto = new LoggerDto(
				VariablesConstant.ERROR,
				"error_catch_in_commonexception_filter",
				"UtilsModule",
				"CommonExceptionFilter",
				"catch",
				exception
			);
			appLoggerDto.addMethodAndRequest("", request);
			this.appLoggerService.writeLog(appLoggerDto);
			response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
				errorMessage: ResponseData.UNKNOWN_ERROR_OCCURRED["errorMessage"],
			});
		}
	}

	private async handleCommonError(exception: any, context: HttpArgumentsHost) {
		const response = context.getResponse<Response>();
		const request = context.getRequest<Request>();
		try {
			const appLoggerDto: LoggerDto = new LoggerDto(
				VariablesConstant.ERROR,
				"error_catch_in_commonexception_filter",
				"UtilsModule",
				"CommonExceptionFilter",
				"catch",
				exception
			);
			appLoggerDto.addMethodAndRequest("", request);
			this.appLoggerService.writeLog(appLoggerDto);
			return response.status(exception.status).send({
				errorMessage: exception.message || ResponseData.UNKNOWN_ERROR_OCCURRED["errorMessage"],
			});
		} catch (e) {
			const appLoggerDto: LoggerDto = new LoggerDto(
				VariablesConstant.ERROR,
				"error_catch_in_commonexception_filter",
				"UtilsModule",
				"CommonExceptionFilter",
				"catch",
				exception
			);
			appLoggerDto.addMethodAndRequest("", request);
			this.appLoggerService.writeLog(appLoggerDto);
			response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
				errorMessage: ResponseData.UNKNOWN_ERROR_OCCURRED["errorMessage"],
			});
		}
	}
}
