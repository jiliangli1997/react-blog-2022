import axios from "axios";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Context } from "../../context/Context";

import "./singlepost.css";

export default function SinglePost() {
  const { user } = useContext(Context);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(
        "https://blog-api-337007.wl.r.appspot.com/api/posts/" + path
      );
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://blog-api-337007.wl.r.appspot.com/api/posts/${post._id}`,
        {
          data: { username: user.username },
        }
      );
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://blog-api-337007.wl.r.appspot.com/api/posts/${post._id}`,
        {
          username: user.username,
          title,
          desc,
        }
      );
      setUpdateMode(false);
    } catch (err) {}
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && <img className="postImg" src={post.photo} alt="" />}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div
                className="singlePostEdit"
                onClick={() => setUpdateMode(true)}
              >
                <i className="singlePostIcon far fa-edit"></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:{" "}
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>

        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
