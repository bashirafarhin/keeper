import React, { useState,useEffect } from "react";
import { useParams } from 'react-router-dom'
import "./Home.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Note from "../Note/Note.jsx";
import CreateArea from "../CreateArea/CreateArea.jsx";
import axios from "axios";

export default function Home() {
    const { userId } = useParams();
    const config={headers: {'Content-Type': 'application/json'}};
    const [notes, setNotes] = useState([]);

    const getAllNotes= async() => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/notes/${userId}`,config);
          setNotes(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    
      useEffect(() => {
        getAllNotes();
      }, []);



    return (
      <div>
      <Header userId={userId}/>
      <div>
      <CreateArea updateNotes={getAllNotes} userId={userId}/>
      <div className="flex-box">
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            noteIndex={index}
            index={index}
            userId={userId}
            title={noteItem.title}
            content={noteItem.content}
            updateNotes={getAllNotes}
          />
        );
      })}
      </div>
      </div>
      <Footer />
    </div>
    );
}