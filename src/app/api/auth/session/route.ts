import { decryptSession } from "@/utils/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    const cookieStore = await cookies();
    const encryptedSession = (await cookieStore).get('clb-session')?.value;

        if(!encryptedSession) {
        return NextResponse.json({error: 'Session not found!'}, {status: 400})
    }

    const decryptedSession = await decryptSession(encryptedSession);

    return NextResponse.json(decryptedSession);
}