//  /api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const API_KEY = process.env.API_KEY;

    const client = await MongoClient.connect(
      "mongodb+srv://TaylorBRoy:API_KEY@cluster0.iuir7.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    console.log(result);
    client.close();
    res.status(201).json({ message: "meetup inserted" });
  }
}

export default handler;
