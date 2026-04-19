"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const drizzle_kit_1 = require("drizzle-kit");
require("dotenv/config");
const dbPath = process.env.DB_PATH ?? path_1.default.resolve(process.cwd(), "dev.db");
exports.default = (0, drizzle_kit_1.defineConfig)({
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    dialect: "sqlite",
    dbCredentials: {
        url: dbPath,
    },
});
