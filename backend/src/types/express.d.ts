import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    tenant?: {
      id: number;
      name: string;
      slug: string;
    };
  }
}
