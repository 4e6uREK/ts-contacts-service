import express, { Request, Response } from "express";
import { checkQueryParam } from "../middleware/queryParam";
import {
  approximateSearchByEmail,
  approximateSearchByEmailAndNumber,
} from "../service/contacts";
import { Contact } from "../data";
import { checkSession, session } from "../middleware/session";

const router = express.Router();

router.get(
  "/",
  checkSession,
  checkQueryParam("email", "string"),
  (req: Request, res: Response) => {
    const email = req.query.email as string;
    const number =
      req.query.number !== undefined ? (req.query.number as string) : "";

    session.data = {
      request: req,
      response: res,
      timeout: setTimeout(() => {
        let result: Contact[] = [];
        if (number !== "") {
          result = approximateSearchByEmailAndNumber(email, number);
        } else {
          result = approximateSearchByEmail(email);
        }

        session.data = null;
        res.json(result);
      }, 5000),
    };
  },
);

export default router;
