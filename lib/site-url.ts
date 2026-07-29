type RuntimeEnvironment = string | undefined;

export function resolveSiteUrl(
  configuredUrl: string | undefined,
  environment: RuntimeEnvironment,
): URL {
  if (!configuredUrl) {
    if (environment === "development") {
      return new URL("http://localhost:3000");
    }

    throw new Error(
      "NEXT_PUBLIC_SITE_URL must be set to the verified deployment origin.",
    );
  }

  let siteUrl: URL;
  try {
    siteUrl = new URL(configuredUrl);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute HTTP(S) URL.");
  }

  if (siteUrl.protocol !== "http:" && siteUrl.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) URL.");
  }
  if (
    siteUrl.pathname !== "/" ||
    siteUrl.search ||
    siteUrl.hash ||
    siteUrl.username ||
    siteUrl.password
  ) {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL must contain only the deployment origin.",
    );
  }

  return new URL(siteUrl.origin);
}

export function getSiteUrl(): URL {
  return resolveSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NODE_ENV,
  );
}
