import { useState, useEffect, useContext } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import { UserContext } from "../../context/UserContext";
import ErrorModal from "../ErrorModal/ErrorModal";
import axios from "axios";
import Loader from "../Loader/Loader";

const MydModalWithGrid = (props) => {
  const [ backgroundImages, setBackgroundImages ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const { setDetails } = useContext(UserContext);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBackgroundImages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/backgroundImages`);
        setBackgroundImages(response.data.backgroundImages);
      } catch(err) {
        setErrorMessage(err.response?.data?.message || "Network error. Please check your connection.");
      }
    }
    fetchBackgroundImages();
  }, []);

  const handleBackgroundImage = async (url) => {
    setLoading(true);
    const token = localStorage.getItem("keeper-token");
    const configWithToken = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    };
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/updateBackground`, { url }, configWithToken );
      setDetails((prevDetails) => ({
        ...prevDetails,
        backgroundImage: url,
      }));
    } catch(err) {
      setErrorMessage(err.response?.data?.message || "Network error. Please check your connection.");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
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
            {backgroundImages.map((imgUrl, index) => (
              <div
                key={index}
                className="grid-item"
                style={{
                  backgroundImage: `url(${imgUrl})`,
                }}
                onClick={() => handleBackgroundImage(imgUrl)}
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
      { loading && <Loader/> }
    </Modal>
  );
};

export default MydModalWithGrid;
