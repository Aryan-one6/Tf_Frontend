function readSecret(req) {
  const querySecret = req?.query?.secret;
  if (typeof querySecret === "string" && querySecret.trim()) return querySecret;

  const headerSecret = req?.headers?.["x-cms-webhook-secret"];
  if (typeof headerSecret === "string" && headerSecret.trim()) return headerSecret;

  return "";
}

function parseBody(req) {
  if (!req || req.body == null) return null;

  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return req.body;
    }
  }

  return req.body;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
  if (!deployHookUrl) {
    return res.status(500).json({
      ok: false,
      error: "Missing VERCEL_DEPLOY_HOOK_URL environment variable",
    });
  }

  const configuredSecret = process.env.CMS_WEBHOOK_SECRET || "";
  if (configuredSecret) {
    const incomingSecret = readSecret(req);
    if (!incomingSecret || incomingSecret !== configuredSecret) {
      return res.status(401).json({ ok: false, error: "Invalid webhook secret" });
    }
  }

  const body = parseBody(req);

  const triggerResponse = await fetch(deployHookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: "cms-webhook",
      triggeredAt: new Date().toISOString(),
      event: body && typeof body === "object" ? body.event || body.type || null : null,
    }),
  });

  if (!triggerResponse.ok) {
    const details = await triggerResponse.text().catch(() => "");
    return res.status(502).json({
      ok: false,
      error: `Deploy hook failed with status ${triggerResponse.status}`,
      details,
    });
  }

  return res.status(200).json({ ok: true, message: "Deploy triggered" });
}
