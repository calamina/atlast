export function errorsMessages(error: any): string[] {
    const errors: string[] = [];
    error.response.data.error.details.errors?.forEach((detail: any) => {
        errors.push(detail.message)
        });
    return errors;
    }
    
    export function errorMessage(error: any): string {
    return error.response.data.error.message ?? '';
}

export default { errorsMessages, errorMessage }
