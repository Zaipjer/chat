import { Avatar, IconButton } from '@mui/material';
import React, { forwardRef } from 'react';
import './Post.css';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { deleteDoc, doc, updateDoc } from '@firebase/firestore';
import { db } from '../firebase';
import { useSelector } from 'react-redux';

const Post = forwardRef(({ id, text, isBlue, username, avatar, uid }, ref) => {

    const user = useSelector((state) => state.user.user);

    const removePost = () => {
        deleteDoc(doc(db, "posts", id));
    }

    const likePost = () => {
        const likePost = doc(db, "posts", id);
        updateDoc(likePost, {
            isBlue: !isBlue
        });
    }

    return (
        <div className={`post ${user.uid === uid ? "post__you" : ""}`} ref={ref}>
            <div className={`post__body ${user.uid === uid ? "post__bodyBackground" : ""}`}>
                <div className="post__bodyLeft">
                    <Avatar className="avatar" src={avatar} alt="Avatar" />
                    <h3>{username}</h3>
                    <h4>{text}</h4>
                </div>
                <div className="post__icons">
                    {user?.uid === uid &&
                        <IconButton onClick={removePost}>
                            <DeleteIcon />
                        </IconButton>
                    }
                    <IconButton onClick={likePost}>
                        <ThumbUpAltOutlinedIcon color={isBlue ? "primary" : ""} />
                    </IconButton>
                </div>
            </div>
        </div>
    );
});

export default Post;