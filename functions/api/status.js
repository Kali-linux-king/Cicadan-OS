// Cloudflare Pages Function: /api/status
export async function onRequest(context) {
  return new Response(JSON.stringify({
    system: "Cicadan_OS",
    version: "3.3.01",
    status: "ONLINE",
    latency: "12ms",
    nodes: 100
  }), {
    headers: { "content-type": "application/json" }
  });
}
