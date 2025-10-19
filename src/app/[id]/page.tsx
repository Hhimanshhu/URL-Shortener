import { redirect } from "next/navigation";
import { connectToDB } from "@/lib/mongodb";
import Url from "@/models/Url";
import redis from "@/lib/redis";

interface Params {
  params: Promise<{ id: string }>; // 👈 Now explicitly async
}

export default async function RedirectPage({ params }: Params) {
  const { id } = await params; // 👈 Await here

  // 1. Check Redis cache
  const cachedUrl = await redis.get(`url:${id}`);
  if (cachedUrl) {
    redirect(cachedUrl as string);
  }

  // 2. Fallback to MongoDB
  await connectToDB();
  const urlDoc = await Url.findOne({ shortId: id });

  if (urlDoc) {
    await redis.set(`url:${id}`, urlDoc.originalUrl);
    redirect(urlDoc.originalUrl);
  }

  return <p>URL not found</p>;
}