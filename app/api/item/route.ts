import { jwtAuth } from "@/lib/jwt-user";
import { NextResponse,NextRequest } from "next/server";

export async function GET (req: NextRequest) {
    const token = req.headers.get("authorization")?.replace('Bearer ', '');
    // console.log(token)
    const user = await jwtAuth(token)
    if (!user) {
        return NextResponse.json({error:"not user"},{status:401})
    }
    return NextResponse.json({test:"test"})
};