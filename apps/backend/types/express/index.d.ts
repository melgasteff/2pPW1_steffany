import "express";
import { JwtPayload } from "../auth";

declare module "express" {
    export interface Request {
        user?: JwtPayload;
    }
}
