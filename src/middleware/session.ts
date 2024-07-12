import { Request, Response, NextFunction } from "express";

interface Session {
  data: {
    timeout: NodeJS.Timeout | null;
    request: Request;
    response: Response;
  } | null;
}

/*
 * Здесь потенциально можно сделать хеш-таблицу вместо общей сессии.
 * Доступ по ключу пользователя если он авторизован, или по ключю фингерпринтига браузера если анонимный доступ
 */
export var session: Session = {
  data: null,
};

export const checkSession = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (session.data !== null) {
    if (session.data.timeout !== null) {
      clearTimeout(session.data.timeout);
    }
    session.data.response
      .status(403)
      .json({ status: "Rejected previous request" });
    session.data = null;
  }

  next();
};
