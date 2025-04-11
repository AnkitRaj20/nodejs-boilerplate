import dotenv from 'dotenv';
import { app } from './app.js';
dotenv.config();
import logger from "../logger.js";
import morgan from "morgan";
import { connectDb } from './db/index.js';

const PORT = process.env.PORT || 3000;

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

connectDb().then(() => {
  logger.info("Connected to the database successfully!");
}).catch((error) => {
  logger.error("Error connecting to the database:", error);
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT , () => {
    logger.info(`Server is running on port ${PORT}`);
})