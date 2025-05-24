import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try{
        console.log("Seeding database");
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Spanish",
                imageSrc: "/ES-Spain.svg",
            },
            {
                id: 2,
                title: "Hindi",
                imageSrc: "/IN-India.svg",
            },
            {
                id: 3,
                title: "French",
                imageSrc: "/FR-France.svg",
            },
            {
                id: 4,
                title: "Italian",
                imageSrc: "/IT-Italy.svg",
            },
            {
                id: 5,
                title: "Japanese",
                imageSrc: "/JP-Japan.svg",
            },
            {
                id: 6,
                title: "German",
                imageSrc: "/DE-Germany.svg",
            },
            {
                id: 7,
                title: "Croatian",
                imageSrc: "HR-Croatia(Hrvatska).svg",
            },
        ]);

        console.log("Seeding finished");

    }catch (error)  {
        console.error(error);
        throw new Error("Failed to seed the database")

    }

};

main();