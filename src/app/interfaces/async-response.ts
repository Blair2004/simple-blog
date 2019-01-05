export interface AsyncResponse {
    status: 'success' | 'failed' | 'warning' | 'info',
    message: string
}
