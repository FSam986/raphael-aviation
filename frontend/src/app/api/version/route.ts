// Current deployed build id. The client compares it with the id it was built
// with (NEXT_PUBLIC_APP_VERSION) to offer a refresh after a new deploy.
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    { version: process.env.NEXT_PUBLIC_APP_VERSION ?? "dev" },
    { headers: { "Cache-Control": "no-store" } },
  );
}
