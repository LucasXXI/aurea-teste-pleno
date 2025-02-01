export class PublishInQueueError extends Error {
    constructor(message: string) {
        super();
        this.message = message;
    }
}