import app from "@/server";
// initializing prisma client
import "@/db";
import { Logger } from "tslog";
import { env } from "./common/utils/envConfig";

const logger = new Logger({ name: "server " });
const server = app.listen(env.PORT, () => {
	logger.info(`app is running on port ${env.PORT}`);
});

const onCloseSignal = () => {
	logger.info("sigint received, shutting down");
	server.close(() => {
		logger.info("server closed");
		process.exit();
	});
	setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
