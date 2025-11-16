import { NextResponse } from "next/server";
import { users } from "../../../../lib/users";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader
      .split(";")
      .map((s) => s.trim())
      .find((c) => c.startsWith("session_user_id="));

    if (!match) {
      return NextResponse.json({ authenticated: false });
    }

    const val = match.split("=")[1];
    const id = Number(val);
    if (Number.isNaN(id)) {
      return NextResponse.json({ authenticated: false });
    }

    const user = users.find((u) => u.id === id);
    if (!user) {
      return NextResponse.json({ authenticated: false });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (err) {
    console.error("/api/auth/status error:", err);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
