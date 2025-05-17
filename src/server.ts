import express, {Application} from "express";
import { env } from "./config/dotenv/dotenv";
import { logger } from "./config/logger/logger";

const app: Application = express();
const PORT = env.PORT

app.use(express.json());

app.listen(PORT, () => {
 logger.info(`Server is running on port ${PORT}`);
});
