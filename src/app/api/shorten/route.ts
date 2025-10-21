import redis from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import Url from "@/models/Url";

function generateId(length = 6) {
  return Math.random().toString(36).substring(2, 2 + length);
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    // ✅ Validate URL
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Invalid URL type" }, { status: 400 });
    }

    // ✅ Optional: normalize URL
    let normalizedUrl = url.trim();
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    await connectToDB();

    // Generate unique shortId
    let shortId = generateId();
    while (await Url.findOne({ shortId })) shortId = generateId();

    const newUrl = await Url.create({ shortId, originalUrl: normalizedUrl });
    const shortUrl = `${req.nextUrl.origin}/${newUrl.shortId}`;

    // ✅ Store clean string value in Redis
    await redis.set(`url:${shortId}`, normalizedUrl);

    return NextResponse.json({ shortUrl });
  } catch (err) {
    console.error("Shorten Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}