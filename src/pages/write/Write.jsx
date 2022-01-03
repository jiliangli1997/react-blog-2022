import "./write.css";
import axios from "axios";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      try {
        const firebaseConfig = {
          apiKey: "AIzaSyDVnKZdn89ygrpi6q2XRrhQ5v9bbY-fdVg",
          authDomain: "blogimage-198c4.firebaseapp.com",
          projectId: "blogimage-198c4",
          storageBucket: "blogimage-198c4.appspot.com",
          messagingSenderId: "956401806148",
          appId: "1:956401806148:web:2fdd42f2829eac4f470511",
          measurementId: "G-DKFSLZWMNZ",
        };

        const firebaseApp = initializeApp(firebaseConfig);

        // Get a reference to the storage service, which is used to create references in your storage bucket
        const storage = getStorage(firebaseApp);

        const metadata = {
          contentType: "image/jpeg",
        };
        const storageRef = ref(storage, "images/" + Date.now() + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;

              // ...

              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                console.log("File available at", downloadURL);
                newPost.photo = downloadURL;

                const res = await axios.post(
                  "https://blog-api-337007.wl.r.appspot.com/api/posts",
                  newPost
                );
                window.location.replace("/post/" + res.data._id);
              }
            );
          }
        );
      } catch (err) {}
    } else {
      try {
        const res = await axios.post(
          "https://blog-api-337007.wl.r.appspot.com/api/posts",
          newPost
        );
        console.log(url);
        window.location.replace("/post/" + res.data._id);
      } catch (error) {}
    }
  };
  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} alt="" className="writeImg" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            type="text"
            placeholder="Tell your story"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
