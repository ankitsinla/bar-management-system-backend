import * as joi from "joi";

export interface EnvConfig {
	ENV: string;
	PORT: number;
	CONTEXT: string;
	ORIGINS: string;
	ALLOWED_HEADERS: string;
	ALLOWED_METHODS: string;
	CORS_ENABLED: boolean;
	CORS_CREDENTIALS: boolean;

	WRITE_LOG: boolean;
	MINIMUM_LOG_LEVEL: string;

	// SWAGGER_PATH: string;
	// SWAGGER_ENABLED: boolean;

	// TEST_KEY: string;

	DB_TYPE: string;
	DB_HOST: string;
	DB_PORT: number;
	DB_USERNAME: string;
	DB_PASSWORD: string;
	DB_DATABASE: string;
	JWT_SECRET: string
}

export const envSchema: joi.ObjectSchema<EnvConfig> = joi.object({
	ENV: joi.string().required().default("dev"),
	PORT: joi.number(),
	CONTEXT: joi.string().empty("").default(`v1.0`),
	ORIGINS: joi.string().default("*"),
	ALLOWED_HEADERS: joi.string(),
	ALLOWED_METHODS: joi.string(),
	CORS_ENABLED: joi.boolean(),
	CORS_CREDENTIALS: joi.boolean(),

	WRITE_LOG: joi.boolean(),
	MINIMUM_LOG_LEVEL: joi.string(),

	// SWAGGER_PATH: joi.string(),
	// SWAGGER_ENABLED: joi.boolean(),

	// TEST_KEY: joi.string(),

	DB_TYPE: joi.string(),
	DB_HOST: joi.string(),
	DB_PORT: joi.number(),
	DB_USERNAME: joi.string(),
	DB_PASSWORD: joi.string(),
	DB_DATABASE: joi.string(),
	JWT_SECRET: joi.string()
});
