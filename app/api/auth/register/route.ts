import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as bcrypt from "bcrypt";

export async function POST (req: NextRequest) {
    
     const { email, password } = await req.json();
     const hashedPassword = await bcrypt.hash(password, 10);
    
      // check email is email before 

    try {
      const user = await db.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

     return NextResponse.json({ user });
    } catch (error) {
      return NextResponse.json({error: "Email have use" },{status: 500 });
    }
};