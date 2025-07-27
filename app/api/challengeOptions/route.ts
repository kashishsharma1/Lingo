import db from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { NextResponse } from "next/server";


export const GET = async () =>  {

   try {
        const isAdmin = await getIsAdmin();
        if (!isAdmin) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const data = await db.query.challengeOptions.findMany();
        return NextResponse.json(data);

    } catch (error) {
        console.error("API_ERROR: Failed to get challenge options.", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }

};

export const POST = async (req : Request) =>  {

    try {
        const isAdmin = await getIsAdmin();
        if (!isAdmin) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const body = await req.json();

        // Validate and explicitly use fields to prevent schema errors
        const data = await db.insert(challengeOptions).values({
            text: body.text,
            correct: body.correct,
            challengeId: body.challengeId,
            imageSrc: body.imageSrc,
            audioSrc: body.audioSrc,
        }).returning();

        // Ensure a record was actually created
        if (data.length === 0 || !data[0]) {
            return new NextResponse("Failed to create record.", { status: 500 });
        }

        return NextResponse.json(data[0]);

    } catch (error) {
        console.error("API_ERROR: Failed to create challenge option.", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
    
};