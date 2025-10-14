"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/prisma.js
const prisma_1 = require("../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
exports.default = prisma;
