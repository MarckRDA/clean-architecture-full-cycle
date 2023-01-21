export type NotificationErrorProps = {
    message: string
    context: string
}

export default class Notification {
    private errors: Array<NotificationErrorProps> = []

    addError(error: NotificationErrorProps) {
        this.errors.push(error)
    }

    getErrors(): NotificationErrorProps[] {
        return this.errors
    }

    hasErrors(): boolean {
        return this.errors.length > 0
    }

    message(context?: string): string {
        let message = ''
        this.errors.filter(error => !context || error.context === context).forEach(error => {
            message += `${error.context}: ${error.message},`
        })

        return message
    }

}