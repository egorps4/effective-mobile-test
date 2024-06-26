import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { Logger, ValidationPipe } from "@nestjs/common"

async function start() {
	console.log("NODE_ENV", process.env.NODE_ENV)
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(new ValidationPipe())

	const port = process.env.PORT || 3000

	await app.listen(port, () => Logger.log(`Backend start on ${port} [${process.env.NODE_ENV}]`))
}
start()
