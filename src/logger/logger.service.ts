import { Injectable, Logger } from "@nestjs/common";
import { LoggerDto } from "./logger.dto";
import { ConfigService } from "src/config/config.service";
import VariablesConstant from "@utils/constants/variable-constants/variable-constants.service";

@Injectable()
export class AppLoggerService {
	constructor(private readonly configService: ConfigService) {}

	private readonly logger: Logger = new Logger();

	async writeLog(appLoggerDto: LoggerDto) {
		const { logLevel, logName, module, className, methodName, ex, message, request, data1, data2, data3, data4 } =
			appLoggerDto;
		try {
			if (ex) {
				const message = ex?.response?.status?.errorMessage ? ex.response.status.errorMessage : ex.message;
				this.logger.error(message + " " + ex.stack);
			}
			const writeLog: string = `${this.configService.get("WRITE_LOG")}`;
			const mininumLogLevel: string = this.setMinimumLogLevel();

			const writeAllowed = this.setWriteAllowed(mininumLogLevel, logLevel);

			if (writeLog == "true" && writeAllowed) {
				const item = new Map();
				item.set("requestParams", this.setRequestParams(request));

				item.set("headers", request?.headers);
				item.set("logTime", new Date());
				item.set("level", logLevel);
				item.set("logName", logName);
				item.set("moduleName", module);
				item.set("className", className);
				item.set("methodName", methodName);
				item.set("data1", data1);
				item.set("data2", data2);
				item.set("data3", data3);
				item.set("data4", data4);
				item.set("hostName", request?.headers?.host);
				const remoteIpAddress = request?.socket?.remoteAddress;
				const initiatedIpAddress: string = request?.headers["X-FORWARDED-FOR"];
				item.set("ipAddress", !remoteIpAddress ? initiatedIpAddress : remoteIpAddress);
				item.set("port", `${this.configService.get("PORT")}`);
				item.set("url", request?.url);
				item.set("message", message);
				item.set(VariablesConstant.EXCEPTION, this.setExceptionMessage(ex));

				const obj = Object.fromEntries(item);
				const finalJsonToPrint = JSON.stringify(obj);
				if (logLevel == VariablesConstant.INFO) {
					this.logger.log({ message: finalJsonToPrint });
				} else if (logLevel == VariablesConstant.WARNING) {
					this.logger.warn({ message: finalJsonToPrint });
				} else {
					this.logger.error({ message: finalJsonToPrint });
				}
			}
		} catch (e) {
			const message = e?.response?.status?.errorMessage ? e.response.status.errorMessage : e.message;
			this.logger.error(message + " " + e.stack);
		}
	}

	setWriteAllowed(mininumLogLevel: string, logLevel: string) {
		if (
			mininumLogLevel === VariablesConstant.INFO ||
			(mininumLogLevel == VariablesConstant.WARNING &&
				(logLevel == VariablesConstant.WARNING || logLevel == VariablesConstant.ERROR)) ||
			(mininumLogLevel == VariablesConstant.ERROR && logLevel == VariablesConstant.ERROR)
		) {
			return true;
		}
		return false;
	}

	setRequestParams(request: any) {
		if (request?.method === "POST") {
			return request.body;
		} else {
			const requestParams = new Map();
			if (request?.query) {
				Object.keys(request?.query)?.forEach((map) => requestParams.set(map, "" + request?.query[map]));
			}
			return requestParams;
		}
	}

	setMinimumLogLevel() {
		let mininumLogLevel: string = `${this.configService.get("MINIMUM_LOG_LEVEL")}`;
		if (!mininumLogLevel || mininumLogLevel.trim() === "") {
			mininumLogLevel = VariablesConstant.INFO;
		}
		return mininumLogLevel;
	}

	setExceptionMessage(ex: any) {
		if (ex) {
			return ex?.response?.status?.errorMessage ? ex.response.status.errorMessage : ex.message;
		}
		return "";
	}
}
