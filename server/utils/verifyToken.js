import jwt from 'jsonwebtoken';
import { ApiError } from './ApiError.js';

export const VerifyToken = (req, res, next) => {
  // Read JWT token from cookie sent by the client
  const token = req.cookies.access_token;

  if (!token) {
    return next(new ApiError(401, 'Unauthorized: No token provided'));
  }

  // verfing the jwt token buy cheking token from env variable
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new ApiError(403, 'Forbidden: Invalid or expired token'));
    }

    // decoded userid allow to go next step in route 
    req.user = { id: decoded.id }; 

    next();
  });
};
