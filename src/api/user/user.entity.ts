import { IHistory } from "src/interfaces/history.interface"
import { IUser } from "src/interfaces/user.interface"

export class UserEntity implements IUser {
	id?: number
	firstName: string
	lastName: string
	age: number
	issues: boolean
	history?: IHistory[]
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date

	constructor(model: IUser) {
		this.id = model?.id
		this.firstName = model.firstName
		this.lastName = model.lastName
		this.issues = model.issues
		this.age = model.age
		this.firstName = model.firstName
		this.history = model.history
		this.createdAt = model.createdAt
		this.updatedAt = model.updatedAt
		this.deletedAt = model.deletedAt
	}

	delete() {
		this.deletedAt = new Date(Date.now())
	}
}
