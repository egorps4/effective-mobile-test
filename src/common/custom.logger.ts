import { LogLevel, Logger } from "@nestjs/common"

export class CustomLogger extends Logger {
	log({ mode = "log", ctx, message = "", error }: { mode?: LogLevel; ctx: string; message?: string; error?: any }) {
		try {
			const time = new Date().toLocaleDateString() + "_" + new Date().toLocaleTimeString()
			let log = `[${time}] [${ctx}] | ${message}`
			if (error) {
				log += `\n ${error}`
			}
			Logger[mode](log)
		} catch (error) {
			Logger.error("Ошибка логирования")
		}
	}
}
