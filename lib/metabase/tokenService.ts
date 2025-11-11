import jwt from 'jsonwebtoken'

export async function generateToken(dashboardId: number) {
  const payload = {
    resource: { dashboard: dashboardId },
    params: {},
    exp: Math.round(Date.now() / 1000) + (10 * 60)
  }
  
  return jwt.sign(payload, process.env.METABASE_SECRET_KEY!)
}