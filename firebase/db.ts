import { getFirestore, addDoc, collection, getCountFromServer, getDoc, getDocs, deleteDoc, doc, query, where, orderBy, OrderByDirection, updateDoc, QueryConstraint, limit, FieldPath, setDoc, onSnapshot } from "firebase/firestore";
import { MESSAGE_COLLECTION, PROJECT_NAME } from "../constants";

export const FIRESTORE_getLatestMessage = async () => {
    const db = getFirestore();

    const collectionRef = collection(db, MESSAGE_COLLECTION);

    const q = query(collectionRef, orderBy('date', 'desc'), limit(1))

    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
        
        return querySnapshot.docs[0].data();
    }
    else return undefined;

}

export const FIRESTORE_getMessageCount = async (): Promise<number> => {
    const db = getFirestore();

    const snapshot = await getCountFromServer(collection(db, MESSAGE_COLLECTION));
    return snapshot.data().count;
}

export const FIRESTORE_listenLatestMessage = async (cb) => {
    const db = getFirestore();
    
    const q = query(collection(db, MESSAGE_COLLECTION));
    var unsubscribe = onSnapshot(q, (docSnapshot) => {
        // docSnapshot.
        // cb(docSnapshot.data() || {});
    });
}


export const FIRESTORE_writeMessage = async (data) => {
    const db = getFirestore();
    
    const collectionRef = collection(db, MESSAGE_COLLECTION);
    
    return await addDoc(collectionRef, data);
}

export const FIRESTORE_getMessageHistory = async () => {
    const db = getFirestore();

    const collectionRef = collection(db, MESSAGE_COLLECTION);

    const snapshot = await getDocs(query(collectionRef, orderBy('date', 'desc'), limit(150)));
    return snapshot.docs.map((doc, i) => doc.data());
}

/*
export const FIRESTORE_search = async (
    searchTerm: string | null): Promise<SearchResult[]> => {
    
    const db = getFirestore();
    const collectionRef = collection(db, JOB_COLLECTION);

    const queryConstraints: QueryConstraint[] = [];

    if (searchTerm !== null) {
        
        // Use simplest solution for searching strings
        // Does not work for partial strings.
        // Can also use trigrams, but firestore document memory limit is 1MB.
        // Can also use Algolita/Elasticsearch
        
        // https://stackoverflow.com/questions/46568142/google-firestore-query-on-substring-of-a-property-value-text-search
        
        // Search title field.
        // queryConstraints.push(
        //     where(
        //         'title',
        //         '>=',
        //         searchTerm,
        //     ),
        // );

        // queryConstraints.push(
        //     where(
        //         'title',
        //         '<=',//'==',
        //         searchTerm + '\uf8ff'
        //     )
        // );

        // Search description field.
        queryConstraints.push(
            where(
                'desc',
                '>=',
                searchTerm,
            ),
        );

        queryConstraints.push(
            where(
                'desc',
                '<=',
                searchTerm// + '\uf8ff'
            )
        );
        
    }
    
    // if (filterBySelection.currentFilterBy !== null) {
    //     const filtering: QueryConstraint = where(
    //         filterBySelection.currentFilterBy?.fieldName,
    //         filterComparison2FirestoreString(filterBySelection.comparison),
    //         filterBySelection.comparisonValue,
    //     );

    //     queryConstraints.push(filtering);
    // }

    const q = query(collectionRef, ...queryConstraints);

    const querySnapshot = await getDocs(q);

    const out: SearchResult[] = [];

    querySnapshot.forEach((doc) => {
        console.log(`Job: ${doc.id} => ${doc.data()}`);
        const newJob = Job.fromJson(doc.id, doc.data());

        out.push(newJob);
    });

    return out;

}
*/
// export const FIRESTORE_addJob = async (newJob: Job) => {
    
//     const db = getFirestore();
//     const collectionRef = collection(db, JOB_COLLECTION);
//     try {
//         const docId = await addDoc(collectionRef, newJob.toJson());
//         console.log("Created new document with Id: ", docId);

//     } catch (err) {
//         console.error("Error adding document: ", err);

        
//     }
// }

// export const FIRESTORE_updateJob = async (job: Job) => {
    
//     const db = getFirestore();
//     const docRef = doc(db, JOB_COLLECTION, job.docId);
//     console.log(job.toJson());
//     try {
//         await updateDoc(docRef, job.toJson());
//     }
//     catch (err) {
//         console.error("Error updating document: ", err);
//     }
// }

// export const FIRESTORE_deleteJob = async (jobId: string) => {
    
//     const db = getFirestore();

//     const docRef = doc(db, JOB_COLLECTION, jobId);

//     return await deleteDoc(docRef);

// }
