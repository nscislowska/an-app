import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, FieldPath, getDoc, getDocs, getFirestore, limit, onSnapshot, orderBy, query, Unsubscribe, updateDoc, where } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import { ChatMessage, User } from "./dbTypes";

export const firebaseConfig = {
    apiKey: "AIzaSyAF2izD9dcn-zsKFGcIALlVCgYFKrf_IRg",
    authDomain: "an-app-9bbc1.firebaseapp.com",
    projectId: "an-app-9bbc1",
    storageBucket: "an-app-9bbc1.appspot.com",
    messagingSenderId: "26888184835",
    appId: "1:26888184835:web:6d84cb5c949d984c8c1a36",
    measurementId: "G-5EJ5C750S0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const fstore = getFirestore(app);

const enum COLLECTIONS {
  users = 'users',
  chatMessages = 'chat_messages'
}

const users = {
  get : async (username: string) => {
          const usersRef = (collection(fstore, "users"));
          const q = query(usersRef, where("username", "==", username));
          const querySnapshot = await getDocs(q);
          const userDoc = querySnapshot.docs[0];
          let user;
          if (userDoc.exists()){
            user = userDoc.data() as User;
          }
          return user;
        },
  update : async (user: User) => {
            const userRef = doc(fstore, "users", user.username);
            await updateDoc(userRef, user as {[key: string]: any});
          }
}


const chatRef = (collection(fstore, COLLECTIONS.chatMessages));
const chatMessagesQuery = () => query(chatRef, orderBy('timestamp', 'desc'), limit(20));

const chat = {
  get : async () => {
        const docs = await getDocs(chatMessagesQuery());
        let chatMessages : ChatMessage[] = [];
        docs.forEach((doc) => {
          chatMessages.push(doc.data() as ChatMessage);
        });
        return chatMessages.reverse();
  },
  add : async (message: ChatMessage) => {
        await addDoc(chatRef, message);
      },
  
  subscribe: (setMessages: (messages: ChatMessage[]) => void) : Unsubscribe => {
        return onSnapshot( chatMessagesQuery(), (querySnapshot) => {
                let chatMessages : ChatMessage[] = [];
                querySnapshot.forEach((doc) => {
                  chatMessages.push(doc.data() as ChatMessage);
                });
                setMessages(chatMessages.reverse());
          });
  }
}

export const db = { users, chat }