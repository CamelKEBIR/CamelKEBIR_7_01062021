import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";


function Profile() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data);
    });

  }, []);


  return (
    
    <div className="profilePageContainer">
      <div className="basicInfo">
       
        <h1> {authState.username} </h1>
        
          <button className="changePassword"
            onClick={() => {
              navigate("/changepassword");
            }}
          > 
            Changer mon mot de passe
          </button> 
          &nbsp;
          <button className="desactivateAccount"
            onClick={() => {
              navigate("/desactivateaccount");
            }}
          > 
            Desactiver Compte
          </button> 
        
      </div>
    </div>
  );
}

export default Profile;
