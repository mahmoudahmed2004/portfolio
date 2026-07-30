import type { Metadata } from "next";

export const HOME_TITLE = "Mahmoud Ahmed Farouk — AI Engineer";
export const HOME_DESCRIPTION =
  "AI Engineer building machine learning, deep learning, computer vision, retrieval, automation, and Python systems.";
export const CV_TITLE = "Mahmoud Ahmed Farouk — AI Engineer CV";
export const CV_DESCRIPTION =
  "Printable CV for Mahmoud Ahmed Farouk, an AI Engineer specializing in machine learning, deep learning, computer vision, retrieval, automation, and Python systems.";

const socialImagePath =
  "/images/og/neural-observatory-1200x630.png";

export function createRouteMetadata({
  title,
  description,
  pathname,
}: {
  title: string;
  description: string;
  pathname: "/" | "/cv";
}): Metadata {
  const socialImage = {
    url: socialImagePath,
    width: 1200,
    height: 630,
    alt: title,
  };

  return {
    title,
    description,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title,
      description,
      siteName: "Mahmoud Ahmed Farouk",
      type: "website",
      url: pathname,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
