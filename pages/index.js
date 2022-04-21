import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from "react/cjs/react.production.min";

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>MeetupsNextJS</title>
        <meta name="description" content="Browse a list of meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://TaylorBRoy:iaHU4PxeDH1MrD3R@cluster0.iuir7.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
