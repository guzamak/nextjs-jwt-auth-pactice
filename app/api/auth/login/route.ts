import { NextRequest, NextResponse } from "next/server";
import { db } from '@/lib/db';
import * as bcrypt from "bcrypt";
import { generateAccessToken } from "@/lib/generate-token";

export async function POST (req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user){
      return NextResponse.json({error: "Email is incorrect" },{status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({error: "Password is incorrect" },{status: 401 });
    }

    const token = generateAccessToken({ id: user.id, email: user.email })

    return NextResponse.json({ success: true, token })
  } catch (error) {
      console.log(error)
      return NextResponse.json({error: "Something when wrong" },{status: 401 });
  }

};