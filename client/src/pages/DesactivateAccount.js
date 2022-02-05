import React, { useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

function DesactivateAccount() {
  
  const [user, setUsers] = useState([]);
  let navigate = useNavigate()

  const desactivateAccount = (id) => {
    if (!window.confirm(`Voulez-vous vraiment désactiver le compte ?`)) return;

    axios.delete("http://localhost:3001/auth/delete", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        setUsers(
          user.filter((val) => {
            return val.id != id;
          })
          
        );
         
      });
    localStorage.clear();
    navigate("/login")
    
  };
  

  return ( 
      
    <div className="formContainer">
      <h1>Desactiver Compte</h1>

        <button onClick={desactivateAccount}>Valider</button>
        
        
    </div>
    
  )
  
}

export default DesactivateAccount;