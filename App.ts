import * as express from "express";
import * as cors from "cors";
import * as http from "http";
import { registerRoutes } from "./src/routes";
/**
 * main file
 */
export class App {
  public app: express.Application;
  public httpServer: http.Server;

  public async init(): Promise<void> {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.middleware();
    this.setupRoutes();
  }
  private async middleware(): Promise<void> {
    this.app.use(cors());
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ limit: "50mb" }));
  }

  private setupRoutes(): void {
    registerRoutes(this.app);
  }
}
