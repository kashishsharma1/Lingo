import db from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = async (
    req: Request,
    {params}: {params: {challengeOptionsId: number}},
) => {

    try {
        const isAdmin = await getIsAdmin();
        if (!isAdmin) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const data = await db.query.challengeOptions.findFirst({
            where: eq(challengeOptions.id, params.challengeOptionsId),
        });

        if (!data) {
             return new NextResponse("Not Found", { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("API_ERROR: Failed to get challenge option.", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }

};

export const PUT = async (
    req: Request,
    {params}: {params: {challengeOptionsId: number}},
) => {

    try {
        const isAdmin = await getIsAdmin();
        if (!isAdmin) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const body = await req.json();
        
        const data = await db.update(challengeOptions).set({
            text: body.text,
            correct: body.correct,
            challengeId: body.challengeId,
            imageSrc: body.imageSrc,
            audioSrc: body.audioSrc,
        })
        .where(eq(challengeOptions.id, params.challengeOptionsId))
        .returning();

        if (data.length === 0 || !data[0]) {
            return new NextResponse("Not Found", { status: 404 });
        }

        return NextResponse.json(data[0]);

    } catch (error) {
        console.error("API_ERROR: Failed to update challenge option.", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }

};


export const DELETE = async (
    req: Request,
    {params}: {params: {challengeOptionsId: number}},
) => {
try {
        const isAdmin = await getIsAdmin();
        if (!isAdmin) {
            return new NextResponse("Unauthorized", { status: 403 });
        }


        const data = await db.delete(challengeOptions)
            .where(eq(challengeOptions.id,params.challengeOptionsId))
            .returning();

        if (data.length === 0 || !data[0]) {
            return new NextResponse("Not Found", { status: 404 });
        }

        return NextResponse.json(data[0]);

    } catch (error) {
        console.error("API_ERROR: Failed to delete challenge option.", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};