// app/api/sso/metabase/route.ts    (Next.js App Router)
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const user = {
  // normalmente lo obtienes desde tu sesión: req.session / getServerSession / token, etc.
  email: "rene@example.com",
  firstName: "Rene",
  lastName: "Descartes",
  group: "Customer",
};

export async function GET() {
  try {
    const METABASE_JWT_SHARED_SECRET = process.env.METABASE_JWT_SHARED_SECRET || "";

    if (!METABASE_JWT_SHARED_SECRET) {
      return NextResponse.json({ error: "METABASE_JWT_SHARED_SECRET not configured" }, { status: 500 });
    }

    // Asegúrate de validar que el usuario está autenticado aquí antes de firmar el token.
    // Esto es solo ejemplo. No firmes tokens para usuarios no autenticados.
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const token = jwt.sign(
      {
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        groups: [user.group],
        // exp en segundos (ej. 10 minutos)
        exp: Math.round(Date.now() / 1000) + 60 * 10,
      },
      METABASE_JWT_SHARED_SECRET
    );

    // Importante: la doc pide que el endpoint devuelva { jwt: string }
    return NextResponse.json({ jwt: token });
  } catch (error) {
    console.error("Error generating token:", error);
    return NextResponse.json({ error: "Failed to generate token" }, { status: 500 });
  }
}
