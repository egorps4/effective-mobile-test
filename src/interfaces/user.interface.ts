import { IHistory } from "./history.interface"

export interface IUser {
	id?: number
	firstName: string
	lastName: string
	age: number
	issues: boolean
	history?: IHistory[]
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date
}
