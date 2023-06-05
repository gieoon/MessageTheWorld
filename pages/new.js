import { serverTimestamp } from "firebase/firestore";
import styles from '../styles/NewPage.module.scss';

import { useEffect, useState } from "react"
import { getMetaData } from "../CMS/helpers";
import { APP_TITLE, SITE_URL } from "../constants";
import { FIRESTORE_getMessageHistory, FIRESTORE_writeMessage } from '../firebase/db';
import StandardButton from "../components/shared/StandardButton";
import { useRouter } from "next/router";
import Loading from '../CMS/Loading';

export default function NewPage() {    

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        setIsLoading(true);
        const newMsg = {
            text: document.getElementById('message').value,
            author: document.getElementById('author').value,
            place: document.getElementById('place').value,
            date: serverTimestamp(),
        }
        await FIRESTORE_writeMessage(newMsg);
        router.push('/');
    }

    return (
        <div className={styles.NewPage}>

            {getMetaData(APP_TITLE + ": NEW", "Share a new message to the world", SITE_URL + '/new', undefined)}
            <div className={styles.wrapper}>
                <textarea id="message" placeholder="Message to share with the next person..." />
                <input id="author" placeholder="My name" name="name" defaultValue={"Someone"} />
                <input id="place" placeholder="Where in the world are you?" name="location" defaultValue={"Somewhere"} />

                {/* <div className={'submit-btn'} onClick={() => {
                    sendMessage();
                }}>
                    Share
                </div> */}
                <StandardButton 
                    text={'Share'}
                    cb={() => sendMessage()}
                    isMaxWidth={true}
                />
            </div>

            <Loading 
                loading={isLoading}
                backgroundColor={'var(--secondary)'}
                loaderColor={'white'}
                loadingTexts=""
                forceAbsolute={false}
            />
        </div>
    )
}