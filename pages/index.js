import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb://localhost:27017/meetups');
    const db = client.db();
    const meetupCollection = db.collection('meetups');
    const meetups = await meetupCollection.find({}).toArray();
    client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                description: meetup.description,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
}

export default function HomePage(props) {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name="decription" content="Browse a huge list of highly active React meetups!" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    )
}
// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     return {
//         props: {    // will be passed to the page component as props
//             meetups: DUMMY_MEETUPS      // will be passed to the page component as props
//         }
//     }
//}
