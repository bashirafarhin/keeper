import { useContext } from "react";
import "./Home.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Note from "../Note/Note.jsx";
import CreateArea from "../CreateArea/CreateArea.jsx";
import { UserContext } from "../../context/UserContext.jsx";
import backgroundImagesLink from "../ProfileButton/BackgroundImages.js";

const Home = () => {
    const { details : { notes, backgroundImageIndex} } = useContext(UserContext);
    return (
      <div style={{backgroundImage: `url(/backgroundImages/${backgroundImagesLink[backgroundImageIndex]})`}} className="home-container">
      <Header/>
      <div>
      <CreateArea/>
      <div className="flex-box">
      {notes?.map((noteItem) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
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