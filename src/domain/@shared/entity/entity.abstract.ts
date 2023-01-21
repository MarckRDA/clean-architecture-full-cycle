import Notification from "../notification/notification"

export default abstract class Entity {
    protected _id: string
    protected _notification: Notification

    constructor() {
        this._notification = new Notification()
    }

    get id(): string {
        return this._id
    }

    get notification(): Notification {
        return this._notification
    }
}