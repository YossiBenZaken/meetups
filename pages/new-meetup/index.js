import { useRouter } from 'next/router';
import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
export default function NewMeetupPage() {
    const router = useRouter();
    async function addMeetupHandler(enteredMeetupData) {
        const request = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await request.json();
        console.log(data);
        router.push('/');
    }
    return (<><Head>
        <title>Add a New Meetup</title>
        <meta name="decription" content="Add your own meetups and create amazing networking opportunities" />
    </Head><NewMeetupForm onAddMeetup={addMeetupHandler} /></>)
}
