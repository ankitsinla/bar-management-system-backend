import { Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";

import * as fs from "fs";
import * as path from "path";
import { AppLoggerService } from "./logger.service";

// Ensure the log directory exists
const logDir = "log";
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

// Get the current date to use as the filename
const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
const logFilename = path.join(logDir, `${currentDate}.log`);

@Module({
	imports: [
		WinstonModule.forRoot({
			transports: [
				new winston.transports.Console({
					format: winston.format.combine(winston.format.timestamp(), winston.format.simple())
				}),
				new winston.transports.File({
					filename: logFilename,
					format: winston.format.json()
				})
			]
		})
	],
	providers: [AppLoggerService],
	exports: [AppLoggerService]
})
export class LoggerModule {}
