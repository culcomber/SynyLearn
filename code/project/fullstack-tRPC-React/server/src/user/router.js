"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../trpc");
const db_1 = require("./db");
exports.userRouter = (0, trpc_1.router)({
    getUsers: trpc_1.publicProcedure.query(() => {
        return db_1.users;
    }),
    getUserById: trpc_1.publicProcedure
        .input((val) => {
        if (typeof val === 'string')
            return val;
        throw new Error(`Invalid input: ${typeof val}`);
    })
        .query((req) => {
        const { input } = req;
        const user = db_1.users.find((user) => user.id === input);
        return user;
    }),
    createUser: trpc_1.publicProcedure
        .input(zod_1.z.object({ name: zod_1.z.string() }))
        .mutation((req) => {
        const { input } = req;
        const user = {
            id: `${Math.random()}`,
            name: input.name,
        };
        db_1.users.push(user);
        return user;
    }),
});
