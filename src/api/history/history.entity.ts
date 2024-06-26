import { ActionsType, IHistory } from "src/interfaces/history.interface"
import { IUser } from "src/interfaces/user.interface"

export class HistoryEntity implements IHistory {
	id?: number
	actionType: ActionsType
	user: IUser
	createdAt?: Date
	updatedAt?: Date

	constructor(model: IHistory) {
		this.id = model?.id
		this.actionType = model.actionType
		this.user = model.user
		this.createdAt = model.createdAt
		this.updatedAt = model.updatedAt
	}
}
