import { MongoClient } from 'mongodb';
// /api/new-meetup

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const client = await MongoClient.connect('mongodb+srv://Yossi:Yossi17@meetups.isjmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
        const db = client.db();
        const meetupCollection = db.collection('meetups');
        const result = await meetupCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(200).json({
            status: 'success',
            data: data
        });
    }
}
export default handler;