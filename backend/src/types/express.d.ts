import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: number;
      name: string;
      email: string;
      platformRole: string;
    };
    store?: {
      id: number;
      name: string;
      slug: string;
      status: string;
    };
    storeMembership?: {
      role: string;
    };
  }
}
