// Cloudflare Pages Function: /api/decrypt
export async function onRequestPost(context) {
  try {
    const { key } = await context.request.json();
    if (key === "0x14061994") {
      return new Response(JSON.stringify({
        success: true,
        message: "Key verified. Chapter 02 decrypted.",
        payload: "TASK 02: Shadow Networks & PGP (1994)"
      }), { headers: { "content-type": "application/json" } });
    }
    return new Response(JSON.stringify({
      success: false,
      message: "Access Denied. Invalid Decryption Key."
    }), { status: 401, headers: { "content-type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Malformed request" }), { status: 400 });
  }
}
