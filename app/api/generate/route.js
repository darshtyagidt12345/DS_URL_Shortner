
import clientPromise from "@/lib/mongodb"

export async function POST(request) {

    const body = await request.json() 
    const client = await clientPromise;
    const db = client.db("DS_URL_Shortner")
    const collection = db.collection("URLs")

    // Check if the short url exists
    const doc = await collection.findOne({shorturl: body.shorturl})
    if(doc){
        return Response.json({success: false, error: true,  message: 'URL already exists!' },{
          status:"400"
        })
    }

    const result = await collection.insertOne({
        url: body.url,
        shorturl: body.shorturl
    })

    return Response.json({success: true, error: false,  message: 'URL Generated Successfully' })
  }