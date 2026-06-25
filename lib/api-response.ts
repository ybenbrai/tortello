// ============================================================
// API Response Helpers
// Consistent response format for all API routes
// ============================================================

export function ok<T>(data: T, status = 200) {
  return Response.json(data, { status })
}

export function err(message: string, status: number) {
  return Response.json({ error: message }, { status })
}

export const UNAUTHORIZED = err('Unauthorized', 401)
export const NOT_FOUND = err('Not found', 404)
