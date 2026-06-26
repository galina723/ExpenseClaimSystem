import {PrismaClient} from "@prisma/client";
import {config} from "dotenv";

config();

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" 
    ? ["query", "warn", "error"] 
    : ["error"],
});

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to the database successfully.");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
};
const disconnectDB = async () => {
    try {
        await prisma.$disconnect();
        console.log("Disconnected from the database successfully.");
    } catch (error) {
        console.error("Error disconnecting from the database:", error);
    }
};

export {connectDB, disconnectDB};
export default prisma;