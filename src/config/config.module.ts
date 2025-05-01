import { Global, Module } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { environments } from "./environments";

@Global()
@Module({
	providers: [
		{
			provide: ConfigService,
			useValue: new ConfigService(`${environments["dev"]}`)
		}
	],
	exports: [ConfigService]
})
export class ConfigModule {}
