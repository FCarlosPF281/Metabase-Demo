import { generateToken } from '@/lib/metabase/tokenService'

export async function GET() {
  const token = await generateToken(123) // dashboard ID
  return Response.json({ token })
}