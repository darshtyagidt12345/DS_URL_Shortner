import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate input data
    if (!body.url || !body.shorturl) {
      return Response.json(
        { success: false, error: true, message: "Missing URL or short URL" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("DS_URL_Shortner");
    const collection = db.collection("URLs");

    // Check if the short URL already exists
    const doc = await collection.findOne({ shorturl: body.shorturl });
    if (doc) {
      return Response.json(
        { success: false, error: true, message: "Short URL already exists!" },
        { status: 400 }
      );
    }

    // Insert the new URL into the collection
    const result = await collection.insertOne({
      url: body.url,
      shorturl: body.shorturl,
      createdAt: new Date(), // Add a timestamp for better debugging
    });

    // Successful response
    return Response.json(
      {
        success: true,
        error: false,
        message: "URL Generated Successfully",
        insertedId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Error:", error);

    // Handle errors gracefully
    return Response.json(
      { success: false, error: true, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
