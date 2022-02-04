import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  let navigate = useNavigate()

  const changePassword = () => {
    axios
      .put(
        "http://localhost:3001/auth/changepassword",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        }
        else 
        navigate("/profile");
      });
  };

  return (
    <div className="formContainer">
      <h1>Changer mon mot de passe</h1>
      <input
        type="text"
        placeholder="Ancien mot de passe..."
        onChange={(event) => {
          setOldPassword(event.target.value);
        }}
      />
      &nbsp;&nbsp;
      <input
        type="text"
        placeholder="Nouveau mot de passe..."
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}
      />
      <button onClick={changePassword}>Valider</button>
      
      
    </div>
  );
}

export default ChangePassword;
