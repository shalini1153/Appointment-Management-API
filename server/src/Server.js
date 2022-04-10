import http from "http";
import dotenv from "dotenv";
dotenv.config();
import app from "./App";
import config from "./config/Index";
import logger from "./core/Logger";
import { connect } from './core/DbConnection';

const PORT = process.env.PORT || config.port;
const HOST = process.env.HOST || config.host;

const application = new app().init();
const server = http.createServer(application);


const listen = () => {
  server.listen(PORT,
    () => {
      console.log(`${config.apiName} is running in IP: ${HOST}  PORT : ${PORT}`);
      console.log(`Worker ${process.pid} started`);
    });
};


const stopServer = () => {
  logger.info("####### MongoDb Disconnected #######");
  server.close(() => {
    logger.warn(`${config.apiName}is Stopped in IP: ${HOST}  PORT : ${PORT}`);
  });
};

const startServer = async () => {
  console.info("Starting Db Server");
  try {
    //To connect database
    await connect();
    listen();
  }
  catch (e) {
    console.log(e.message);
  }
};

export {
  startServer,
  stopServer
};
