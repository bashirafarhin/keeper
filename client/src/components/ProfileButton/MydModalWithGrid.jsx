import { useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import backgroundImagesLink from "./BackgroundImages";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import ErrorModal from "../ErrorModal/ErrorModal";
import axios from "axios";

const MydModalWithGrid = (props) => {

  const { setDetails } = useContext(UserContext);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBackgroundImage = async (index) => {
    const token = localStorage.getItem("keeper-token");
    const configWithToken = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/updateBackground`, { index }, configWithToken );
      setDetails((prevDetails) => ({
        ...prevDetails,
        backgroundImageIndex: index,
      }));
    } catch(err) {
      setErrorMessage(err.response?.data?.message || "Network error. Please check your connection.");
      setShowErrorModal(true);
    }
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
      {showErrorModal && (
        <ErrorModal
          Error={errorMessage}
          handleShow={showErrorModal}
          handleHide={() => setShowErrorModal(false)}
        />
      )}
    </Modal>
  );
};

export default MydModalWithGrid;
