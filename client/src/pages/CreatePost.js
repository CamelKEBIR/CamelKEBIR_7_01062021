import React, { useState, useContext,useEffect } from 'react';
import "../App.css";
import  Axios  from 'axios';
import { useNavigate } from 'react-router-dom'



function CreatePost() {

    const [title, setTitle] = useState("");
    const [postText, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [username, setUsername] = useState("")


    let navigate = useNavigate();
    
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
          navigate("/login");
        }
    }, []);

    const upload = () => {


        const formData = new FormData()
            formData.append("file", image[0])
            formData.append("upload_preset", "groupomania_project")

        Axios.post(`https://api.cloudinary.com/v1_1/gr0upomania/image/upload`, 
        formData
        ).then((response) => {
            const fileName = response.data.public_id

            Axios.post("http://localhost:3001/posts", {title: title, postText: postText,username : username, image: fileName 
            
            }).then(() => {
                navigate("/")
            })
            
        });


    };

    return (
        <div className="createPostPage">
            
            <div className="formContainer">
                

                <input type="text" placeholder="Titre" 
                onChange={(event) => {setTitle(event.target.value)}} />&nbsp;

                <input className="text" type="text" placeholder="Description"
                onChange={(event) => {setDescription(event.target.value)}} />&nbsp;

                <input type="text" placeholder="Pseudo" 
                onChange={(event) => {setUsername(event.target.value)}} />&nbsp;

                
                <input id="file" className="input-file" type="file" 
                onChange={(e) => setImage(e.target.files)}/>
                
                <button onClick={upload}>Publier</button>
            </div>
        </div>
            
        
    )
}

export default CreatePost
