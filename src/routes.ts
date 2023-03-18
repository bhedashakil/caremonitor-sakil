/* eslint-disable no-unused-vars */
import * as express from "express";
import { HeartBeatController } from "./modules/heartBeat/heartBeat.controller";

export function registerRoutes(app: express.Application): void {
  new HeartBeatController().register(app);
}
