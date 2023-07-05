import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { auth } from "../firebase";
import { ChatEngine } from "react-chat-engine";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }

    axios
      .get("http://api.chatengine.io/users/me/", {
        headers: {
          "project-id": "92baadad-54e8-4f97-b077-b00354890a2c",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": "9243f9da-567c-4df1-b669-1f5adb368466",
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [user, history]);

  // if(!user || loading) return 'Loading.. Please Fuck U !'
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Potter Chat</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="92baadad-54e8-4f97-b077-b00354890a2c"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
