import { IUser } from "./user.interface"

export type ActionsType = "create" | "update"

export interface IHistory {
	id?: number
	actionType: ActionsType
	user: IUser
	createdAt?: Date
	updatedAt?: Date
}
