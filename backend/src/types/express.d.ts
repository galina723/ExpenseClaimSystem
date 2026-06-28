declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        name: string;
        email: string;
        role: string;
        avatar: string | null;
        departmentId: string;
      };
    }
  }
}

export {};