import './ResponseText.css'
import { where, query, getDocs, collection, getFirestore } from 'firebase/firestore';
import app from '../../firebaseconfig'; // Adjust the import path as necessary
import ResponseInstance from '../response-instance/ResponseInstance';
import {Fragment} from 'react'
const db = getFirestore(app);


function ResponseText() {

    var user_responses = []

    const getUserResponses = async () => {

        const responseMessagesQuery = query(collection(db, 'responseMessages'), where('user_id', '==', "Da6AzPT7rPWIlkrUL1zCacYmEVl2"));
        const querySnapshot = await getDocs(responseMessagesQuery);
        querySnapshot.forEach((doc) => {
            user_responses.push(
                {
                    id: String(user_responses.length),
                    component: ResponseInstance(doc.get("response")),
                }
            )
        });
    }

    const printLength = () => {
        console.log("Printing all contents of the array: ");
        console.log("")
        for (var i = 0; i < user_responses.length; i++) {
            console.log(user_responses.at(i).component.Text)
        }
        console.log("")
        console.log("Done printing all contents.")
    }

    const resetArray = () => {
        user_responses = []
    }
    let string_response = ""+user_responses.at(0);

    return (
        <div className='response-text-container'>
            <button onClick={getUserResponses}>Add responses to array</button>
            <button onClick={printLength}>Print Contents of Responses</button>
            <button onClick={resetArray}>Reset array</button>
            {/* {String(user_responses.at(0))} */}
            {user_responses.map((chat) =>
                <Fragment key={chat.id} >
                    <div>{chat.component}</div>
                </Fragment>)}
            {/* {user_responses[0].component} */}
            <div>
                
                {/* <ResponseInstance Text={string_response} /> */}
                {/* <ResponseInstance Text={user_responses[localStorage.getItem("component_id")-1]} /> */}
                {/* <ResponseInstance text={user_responses.at(0).} /> */}
                {/* {string_response} */}
            </div>
        </div>
    );
}

export default ResponseText;