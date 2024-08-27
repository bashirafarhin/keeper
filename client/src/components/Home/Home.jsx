import { useEffect, useContext } from "react";
import "./Home.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Note from "../Note/Note.jsx";
import CreateArea from "../CreateArea/CreateArea.jsx";
import { UserContext } from "../../context/UserContext.jsx";
import { getAllNotes } from "../../service/api.js";
import { useParams } from "react-router-dom";

const Home = () => {
    const { id }=useParams();
    const { details : { notes }, setDetails}=useContext(UserContext);

    useEffect(() => {
      const fetchNotes = async () => {
        let response=await getAllNotes(id);
        setDetails((prevDetails) => ({
          ...prevDetails,
          notes: response.data.notes,
          backgroundImageIndex : response.data.backgroundImageIndex
        }));

      };
      fetchNotes();
    }, [id,setDetails]);    

    return (
      <div>
      <Header/>
      <div>
      <CreateArea/>
      <div className="flex-box">
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            noteIndex={index}
            index={index}
            title={noteItem.title}
            content={noteItem.content}
          />
        );
      })}
      </div>
      </div>
      <Footer />
    </div>
    );
}

export default Home;