import cookieSession from "./cookieSession";
import cookieSessionRefresh from "./cookieSessionRefresh";
import { NextApiHandler } from "next";

// Load environment variables.
// require('../../env')

export default (handler: NextApiHandler) =>
  cookieSession(cookieSessionRefresh(handler));
