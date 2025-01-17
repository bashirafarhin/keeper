import { Button, Container, Modal } from "react-bootstrap";
import backgroundImagesLink from "./BackgroundImages";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const MydModalWithGrid = (props) => {

  const { setDetails } = useContext(UserContext);

  const handleBackgroundImage = async (index) => {
    const token = localStorage.getItem("token");
    const configWithToken = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    setDetails((prevDetails) => ({
      ...prevDetails,
      backgroundImageIndex: index,
    }));
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/updateBackground`, { index }, configWithToken );
  };

  return (
    <Modal
      size="lg"
      show={props.Show2}
      onHide={props.onSHide2}
      aria-labelledby="contained-modal-title-vcenter example-modal-sizes-title-lg"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Background Patterns
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container className="p-0 container">
          <div className="grid-container">
            {backgroundImagesLink.map((imgLink, index) => (
              <div
                key={index}
                className="grid-item"
                style={{
                  backgroundImage: `url(${`/backgroundImages/${imgLink}`})`,
                }}
                onClick={() => handleBackgroundImage(index)}
              ></div>
            ))}
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide2}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MydModalWithGrid;
