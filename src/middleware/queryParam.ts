import { NextFunction, Request, Response } from "express";

export const checkQueryParam = (
  param: string,
  type: string,
): ((req: Request, res: Response, next: NextFunction) => void) => {
  const func = function (req: Request, res: Response, next: NextFunction) {
    if (!req.query) return res.send("No parameters specified");

    if (req.query[param] === undefined) {
      res.status(403);
      return res.json({ error: `Provide '${param}' parameter in URL` });
    }

    if (typeof req.query[param] !== type) {
      res.status(403);
      return res.json({ error: `'${param}' should be '${type}'` });
    }

    next();
  };

  return func;
};
