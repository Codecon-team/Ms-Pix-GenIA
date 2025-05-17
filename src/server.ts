import './config/dotenv/load-env';
import express, {Application} from "express";
import { env } from "./config/dotenv/dotenv";
import { logger } from "./config/logger/logger";
import { errorHandler } from "./middlewares/error-handle";
import { router } from "./routes/payment-router";

const app: Application = express();
const PORT = env.PORT

app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

app.listen(PORT, () => {
 logger.info(`Server is running on port ${PORT}`);
});
