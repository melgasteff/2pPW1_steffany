import { JwtUserPayload } from './user';

declare global {
    namespace Express {
        interface Request {
            user?: JwtUserPayload;
        }
    }
}

declare module "express" {
    export interface Request {
        user?: JwtPayload;
    }
}
