import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <MeetupDetail
      // id={props.id}
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://TaylorBRoy:iaHU4PxeDH1MrD3R@cluster0.iuir7.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    //false = all paths have been defined.  404 will be generated
    //blocking= list of paths is not exhausted.  might be more pages.  returns finished page
    //true= list of paths is not exhausted.  might be more pages. immediately return empty page(need to handle this) and then pull down content after don rendering
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupID: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupID = context.params.meetupID;
  const API_KEY = process.env.API_KEY;
  const client = await MongoClient.connect(
    "mongodb+srv://TaylorBRoy:API_KEY@cluster0.iuir7.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupID),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
      },
    },
  };
}

export default MeetupDetails;
