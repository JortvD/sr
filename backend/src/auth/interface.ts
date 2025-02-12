import { UserDocument } from "../users/schema";
import { Request } from "express";

export interface UserAttachedRequest extends Request {
	user?: UserDocument;
}