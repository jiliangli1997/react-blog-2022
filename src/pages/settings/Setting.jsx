import "./setting.css";
import SideBar from "../../components/sidebar/SideBar";
import { Context } from "../../context/Context";
import React from "react";
import { useEffect, useState, useContext } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import axios from "axios";

export default function Setting() {
  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
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
                updatedUser.profilePic = downloadURL;

                const res = await axios.put(
                  "https://blog-api-337007.wl.r.appspot.com/api/users/" +
                    user._id,
                  updatedUser
                );
                setSuccess(true);
                dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
              }
            );
          }
        );
      } catch (err) {}
    } else {
      try {
        const res = await axios.put(
          "https://blog-api-337007.wl.r.appspot.com/api/users/" + user._id,
          updatedUser
        );
        setSuccess(true);
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      } catch (error) {}
    }
  };

  return (
    <div className="setting">
      <div className="settingWrapper">
        <div className="settingTitile">
          <span className="settingUpdateTitle">Update Your Acccount</span>
          <span className="settingDeleteTitle">Delete Account</span>
        </div>
        <form className="settingForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingPP">
            <img
              src={file ? URL.createObjectURL(file) : user.profilePic}
              alt=""
            />

            <label htmlFor="fileInput">
              <i className="writeIcon fas fa-plus"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />

            <label htmlFor="fileInput">
              <i className="settingPPIcon far fa-user-circle"></i>
            </label>
            <input type="file" id="fileInput" style={{ display: "none" }} />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingSubmit" type="submit">
            Update
          </button>
          {success && <span style={{ color: "green" }}>Profile Updated</span>}
        </form>
      </div>
      <SideBar />
    </div>
  );
}
