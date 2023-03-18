/* eslint-disable no-unused-vars */
import { Application, Request, Response } from "express";
import { Messages } from "../../constants";
import { ResponseHandler } from "../../helpers";
import { BaseController } from "../BaseController";
import { APIROUTE } from "../../constants/constant";
import { HeartBeatService } from "./heartBeat.service";
/**
 * HeartBeatController
 */
export class HeartBeatController extends BaseController {
  public path = APIROUTE.heartBeat;
  constructor() {
    super();
    this.init();
  }

  public init(): void {
    this.router.post("/", this.processHeartBeatData);
  }

  public register(app: Application): void {
    app.use(`/api/${this.path}`, this.router);
  }

  public async processHeartBeatData(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const reqData: any = req.body;
      const heartBeatService: HeartBeatService = new HeartBeatService();
      const result = await heartBeatService.processHeartBeatData(reqData);
      res.locals = {};
      res.locals.message = Messages.SUCCESS_RECEIVED;
      res.locals.data = result;
      ResponseHandler.JSONSUCCESS(req, res);
    } catch (err) {
      res.locals.errorCode = err.errorCode;
      res.locals.statusCode = err.statusCode;
      res.locals.message = err.message;
      res.locals.data = err;
      ResponseHandler.JSONERROR(req, res, "API ERROR");
    }
  }
}
