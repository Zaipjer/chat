import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import './Main.css';
import Post from './Post';
import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";
import { useSelector } from 'react-redux';
import FlipMove from 'react-flip-move';

const Main = () => {

    const [posts, setPosts] = useState([]);
    const [input, setInput] = useState("");

    // Obtener el state
    const isopen = useSelector((state) => state.menu.isopen);
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        const collectionRef = collection(db, "posts");
        const q = query(collectionRef, orderBy("timestamp", "asc"));

        const unsub = onSnapshot(q,
            (snapshot) => {
                setPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })));
            },
            (error) => {
                console.log(error);
            });
        return unsub;
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input) {
            try {
                addDoc(collection(db, "posts"), {
                    text: input,
                    username: user?.displayName,
                    uid: user?.uid,
                    avatar: user?.photoURL,
                    timestamp: serverTimestamp(),
                    isBlue: false,
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
            //setPosts([input, ...posts]);
            setInput("");
        } else {
            alert("Add your post");
        }
    }

    return (
        <div className={`main ${isopen ? "menuopen" : ""}`}>
            <div className="main__posts">
                <FlipMove>
                    {
                        posts?.map(({ id, data: { text, isBlue, username, avatar, uid } }) =>
                            <Post key={id} id={id} text={text} isBlue={isBlue} username={username} avatar={avatar} uid={uid} />
                        )
                    }
                </FlipMove>
            </div>
            <div className="main__input">
                <form>
                    <div className="main__inputForm">
                        <TextField className="main__inputFormText" id="outlined-basic" label="Escriba su mensaje aquí ..." variant="outlined" value={input} onChange={(e) => setInput( e.target.value)} />
                    </div>
                    <button className="button" type="submit" onClick={handleSubmit}></button>
                </form>
            </div>
        </div>
    );
}

export default Main;