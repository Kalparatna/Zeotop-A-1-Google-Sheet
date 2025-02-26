import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils";

type User = {
  _id: string;
  name: string;
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const verifyToken = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token = req.headers.authorization?.split(" ")[1]; // ✅ Correct token extraction

      if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

      let decoded = jwt.verify(token, process.env.JWT_SECRET as string); // ✅ Proper token verification
      req.user = decoded as User;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
  }
);

export default verifyToken;
