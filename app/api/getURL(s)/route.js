import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server";
export async function POST() {
    const client = await clientPromise
    const db = client.db("DS_URL_Shortner");
    const collection = db.collection("URLs");
    const urls = await collection.find({}).toArray()
    return NextResponse.json({ urls: urls })
}