export class Response {
	errorMessage: string;
	errorCode: number;
	constructor(code, message) {
		this.errorCode = code;
		this.errorMessage = message;
	}
}

export const ResponseData = {
	SUCCESS: new Response(0, "Success"),
	UNKNOWN_ERROR_OCCURRED: new Response(1, "Something went wrong ! Please try after some time.")
};
