import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();

    // Input validation
    if (!body.shorturl) {
      return Response.json(
        { success: false, error: true, message: "Short URL is required" },
        { status: 400 }
      );
    }

    // MongoDB connection
    const client = await clientPromise;
    const db = client.db("DS_URL_Shortner");
    const collection = db.collection("URLs");

    // Check if the short URL exists
    const doc = await collection.findOne({ shorturl: body.shorturl });
    if (!doc) {
      return Response.json(
        { success: false, error: true, message: "URL Not Found!" },
        { status: 404 }
      );
    }

    // Return the original URL
    return Response.json(
      { success: true, error: false, message: `${doc.url}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);

    // Return Internal Server Error if something fails
    return Response.json(
      { success: false, error: true, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
