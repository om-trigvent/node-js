class ErrorResponse {
    constructor(statusCode,message="Something Went Wrong"){
        this.statusCode =statusCode
        this.message = message
    }
}

export { ErrorResponse }