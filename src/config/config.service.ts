import { Logger } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";
import { resolve } from "path";
import * as fs from "fs";
import { parse } from "dotenv";
import { EnvConfig, envSchema } from "./validation.types";

export class ConfigService extends NestConfigService {
	private readonly Logger = new Logger(ConfigService.name);

	private readonly configs: EnvConfig;

	constructor(filePath: string) {
		super();

		const _PATH = resolve(filePath);
		const envConfigs: any = parse(fs.readFileSync(_PATH));
		this.Logger.log(`Loading ENV----> [${filePath}] : PATH:${_PATH}\n\n`);

		Object.keys(envConfigs).map((configKey) => {
			envConfigs[configKey] = envConfigs[configKey].toString();
		});
		
		this.configs = ConfigService.validateInput(envConfigs);
		process.env = {...envConfigs};
	}

	private static validateInput(envConfig: EnvConfig): EnvConfig {
		const { error, value: validatedEnvConfig } = envSchema.validate(envConfig);
		if (error) {
			throw new Error(`Config validation error: ${error.message}`);
		}
		return validatedEnvConfig;
	}

	public get(key: keyof EnvConfig) {
		return this.configs[key];
	}
}
