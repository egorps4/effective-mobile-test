import { HistoryModel } from "src/api/history/history.model"
import { UserModel } from "src/api/user/user.model"
import { MigrationInterface, QueryRunner } from "typeorm"

export class $npmConfigName1719426900754 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		for (let i = 0; i < 1000; i++) {
			const user = await queryRunner.manager.insert(UserModel, {
				firstName: `FirstName${i}`,
				lastName: `LastName${i}`,
				age: Math.floor(Math.random() * 100),
				issues: Math.random() < 0.5,
				createdAt: new Date(),
				updatedAt: new Date(),
			})

			await queryRunner.manager.insert(HistoryModel, {
				actionType: "create",
				user: user.identifiers[0].id,
				createdAt: new Date(),
				updatedAt: new Date(),
			})
		}
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE FROM "history"`)
		await queryRunner.query(`DELETE FROM "user"`)
	}
}
