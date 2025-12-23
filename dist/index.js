import 'dotenv/config';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
const app = express();
const PORT = process.env.PORT || 3000;
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL
});
const adapter = new PrismaPg(pool);
const prismaClient = new PrismaClient({
    adapter
});
app.use(express.json());
app.get('/', async (req, res) => {
    const data = await prismaClient.user.findMany();
    res.json({ data });
});
app.post('/', async (req, res) => {
    await prismaClient.user.create({
        data: {
            email: Math.random().toString(36),
            name: Math.random().toString(36)
        }
    });
    res.json({ message: "User created" });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map