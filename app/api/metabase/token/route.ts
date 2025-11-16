// app/api/metabase/token/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { users } from "../../../../lib/users";

export async function GET() {
  try {
    // ✅ Await cookies() - Next.js 15+
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session_user_id");

    if (!sessionCookie) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const userId = sessionCookie.value;

    // 🔍 Buscar usuario en lib/users
    const user = users.find(u => String(u.id) === userId);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const METABASE_SECRET = process.env.METABASE_JWT_SHARED_SECRET;
    if (!METABASE_SECRET) {
      return NextResponse.json(
        { error: "Missing METABASE_JWT_SHARED_SECRET" },
        { status: 500 }
      );
    }

    // 🔥 Payload dinámico desde `lib/users`
    const payload = {
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName,
      groups: [user.group],
      exp: Math.floor(Date.now() / 1000) + 60 * 10,
    };

    const token = jwt.sign(payload, METABASE_SECRET);

    // 👌 EL SDK SOLO ACEPTA ESTO
    return NextResponse.json({ jwt: token });

  } catch (err: any) {
    console.error("ERROR JWT TOKEN:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}