import { Module } from "@nestjs/common";
import { ConfigurationService } from "./configuration/configuration.service";
import { ResponseInterceptorService } from "./interceptor/response/response.service";
import { CommonUtilityService } from "./common/common-utility/common-utility.service";

@Module({
	providers: [ConfigurationService, ResponseInterceptorService, CommonUtilityService],
	exports: [ConfigurationService, CommonUtilityService]
})
export class UtilsModule {}
