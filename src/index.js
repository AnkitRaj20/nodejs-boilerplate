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

// In your index.js
connectDb()
  .then(() => {
    logger.info("Connected to the database successfully!");
    // Only start the server after DB connection succeeds
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error("Error connecting to the database:", error);
    // Handle the error without crashing, or exit gracefully
    process.exit(1); // Optional: exit with error code if DB connection is essential
  });

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT , () => {
    logger.info(`Server is running on port ${PORT}`);
})