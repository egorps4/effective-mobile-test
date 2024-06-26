import { ActionsType, IHistory } from "src/interfaces/history.interface"
import { IUser } from "src/interfaces/user.interface"
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { UserModel } from "../user/user.model"

@Entity({ name: "history" })
export class HistoryModel implements IHistory {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: "text" })
	actionType: ActionsType

	@ManyToOne(() => UserModel, user => user.history)
	user: IUser

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	public createdAt: Date

	@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
	public updatedAt: Date
}
