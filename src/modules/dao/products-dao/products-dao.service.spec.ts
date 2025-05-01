import { Test, TestingModule } from "@nestjs/testing";
import { ProductsDaoService } from "./products-dao.service";

describe("ProductsDaoService", () => {
	let service: ProductsDaoService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ProductsDaoService]
		}).compile();

		service = module.get<ProductsDaoService>(ProductsDaoService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
