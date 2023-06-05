import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import styles from '../styles/HomePage.module.scss'
import { GlobalContext } from '../context'
import {APP_ICON, APP_TITLE, PROJECT_NAME, SITE_URL, TWITTER_HANDLE} from '../constants';
import { collectionNameToUrl, getMetaData, getFieldName, loadDynamicData, loadDynamicDataSnapshot, loadFromPath, loadWebpageData, loadWebpageDataSnapshot } from '../CMS/helpers'
import Image from 'next/image';
import SearchBar from '../components/Searchbar'
import StandardButton from '../components/shared/StandardButton'
import BasicModal from '../components/Dialog'
import CMS_String_Field from '../CMS/shared/CMS_String_Field'
import DynamicList from '../models/DynamicList';
import { FIRESTORE_getLatestMessage, FIRESTORE_getMessageCount, FIRESTORE_listenLatestMessage } from '../firebase/db'
import Link from 'next/link'
// import { handleSpreadsheetData } from '../helpers';

export default function IndexPage({
    websiteContent,
    dynamicList,
}){
    // const _websiteContent = JSON.parse(websiteContent);
    // const _dynamicList = JSON.parse(dynamicList);

    const [currentMessage, setCurrentMessage] = useState<any>(undefined);
    const [currentMsgCount, setCurrentMsgCount] = useState<any>(undefined);
  
    const {
        
    } = useContext(GlobalContext);
    
    // console.log("_trips: ", trips);

    useEffect(() => {
        // FIRESTORE_listenLatestMessage
        FIRESTORE_getLatestMessage().then(d => setCurrentMessage(d));
        // ((d) => {
        //     console.log('d', d);
        //     setCurrentMessage(d);
        // });
        FIRESTORE_getMessageCount().then(d => setCurrentMsgCount(d));
        
    }, []);

    const metaTitle = APP_TITLE;
    const metaDescription = "Share your message with the world, or read other peoples' messages";

    return (
        <div className={styles.HomePage}>
            
            { getMetaData(metaTitle, metaDescription, SITE_URL, SITE_URL + '/thumbnail_1600.png') }
            
            <div className={styles.message_wrapper}>
                <p className={styles.message_num}>Message number {currentMsgCount}</p>
                { currentMessage 
                    ? <div>
                        <p className={styles.text}>{currentMessage.text}</p>
                        <p className={styles.author}>By: {currentMessage.author}</p>
                        <p className={styles.place}>In: {currentMessage.place}</p>
                    </div>
                    : <></>
                }
            </div>

            <Link href="/new">
                <a>
                    <StandardButton 
                        text="My message" 
                        cb={undefined} 
                        isCta={undefined} 
                        isMaxWidth={undefined}
                        leftAlign={undefined}            
                    />
                </a>
            </Link>

        </div>
    )
}

// Below formatting is NextJS stuff. Learn about Next.JS directly to get involved.

// export async function getStaticPaths() {
    
//     const loadActivities = async () => {
//         return await loadDynamicData(PROJECT_NAME, 'Activities');
//     }

//     const activityNames = await loadActivities()
//         .then((activities) =>   
//             activities.map(aName => {
                
//                 // console.log('static paths projectName: ', pName);
//                 return { params: { activityName: collectionNameToUrl(aName.title) }, };
//             })
//         );
    
//     // console.log("static paths projectNames: ", projectNames);

//     return {
//         paths: activityNames,
//         fallback: true,
//     }
// }

export async function getStaticProps(context) {

    const websiteContent = await loadWebpageData(PROJECT_NAME);
    var dynamicList = await loadDynamicData(PROJECT_NAME, 'DynamicListCollectionName');
            
    // Loaded from Google Spreadsheet via NextJS NodeJS /api.
    // var spreadsheetList = await loadSpreadsheetData();
            
    // spreadsheetList = handleSpreadsheetData(spreadsheetList);

    // Can use memoized values if data loading is shared.
    const memoizedData = {};

    // Initialize each model class to transform the data.
    for (var i in dynamicList) {
        // For now, memoized data is initialized as empty.
        dynamicList[i] = await DynamicList.init(dynamicList[i],
            memoizedData,
        );

        // console.log("PARENT memoizedItineraryDays: ", Object.keys(memoizedItineraryDays).length);
    }

    return {
        props: {
            dynamicList: JSON.stringify(dynamicList),
            websiteContent: JSON.stringify(websiteContent),
        },
        revalidate: 1440,
    }

}
