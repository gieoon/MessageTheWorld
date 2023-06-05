import { useEffect, useState } from "react"
import { getMetaData } from "../CMS/helpers";
import { APP_TITLE, SITE_URL } from "../constants";
import { FIRESTORE_getMessageHistory } from '../firebase/db';
import styles from '../styles/HistoryPage.module.scss';

export default function HistoryPage() {
    
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        FIRESTORE_getMessageHistory().then((d) => {
            setMessages(d);
        })
    }, []);

    console.log('messages', messages);

    return (
        <div className={styles.HistoryPage}>

            {getMetaData(APP_TITLE + ": HISTORY", "View past messages shared with the world", SITE_URL + '/history', undefined)}

            { messages.map((msg, i) => (
                <div key={'msg'+i}>
                    <p><strong>"{msg.text}"</strong> - {msg.author} in: {msg.place}</p>
                </div>
            ))}
        </div>
    )
}