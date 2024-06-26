import { IUser } from "src/interfaces/user.interface"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { HistoryModel as HistoryModel } from "../history/history.model"
import { IHistory } from "src/interfaces/history.interface"

@Entity({ name: "user" })
export class UserModel implements IUser {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ type: "text" })
	firstName: string

	@Column({ type: "text" })
	lastName: string

	@Column({ type: "int" })
	age: number

	@Column({ type: "boolean" })
	issues: boolean

	@OneToMany(() => HistoryModel, history => history.user)
	history: IHistory[]

	@Column({ type: "timestamp", nullable: true })
	deletedAt: Date

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	public createdAt: Date

	@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
	public updatedAt: Date
}
