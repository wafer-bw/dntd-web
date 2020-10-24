export interface GapiErrorResponseBody {
    code: number,
    message: string,
    status: string
}

export interface GapiErrorResponse {
    error: GapiErrorResponseBody
}
