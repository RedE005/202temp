import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import NowShowing from "../components/NowShowing";
import TheaterListsByMovie from "../components/TheaterListsByMovie";
import SelectedMovie from "../components/SelectedMovie";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "../context/LocationContext";
import UpcomingMovies from "../components/UpcomingMovies";

const Home = () => {
  const { auth } = useContext(AuthContext);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(
    parseInt(sessionStorage.getItem("selectedMovieIndex"))
  );
  const { selectedLocation, updateLocation } = useLocation();
  const [movies, setMovies] = useState([]);
  const [isFetchingMoviesDone, setIsFetchingMoviesDone] = useState(false);
  const [showLocationModal, setshowLocationModal] = useState(true);
  const [locationModalOpen, setLocationModalOpen] = useState(false);


  const handleLocation = (location) => {
    updateLocation(location);
    setshowLocationModal(false);
  };

  const fetchMovies = async () => {
    try {
      setIsFetchingMoviesDone(false);
      let response;
      if (auth.role === "admin") {
        response = await axios.get("/movie/unreleased/showing", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
      } else {
        response = await axios.get("/movie/showing");
      }
      setMovies(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingMoviesDone(true);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const props = {
    movies,
    selectedMovieIndex,
    setSelectedMovieIndex,
    auth,
    isFetchingMoviesDone
  };

  const closeModal = () => {
    setshowLocationModal(false);
  };


  return (
    <div className="flex min-h-screen flex-col gap-4 bg-gradient-to-br from-indigo-900 to-red-500 pb-8 sm:gap-8">
      <Navbar />
      {selectedLocation === null && (
        <Modal
          isOpen={showLocationModal}
          onRequestClose={closeModal}
          shouldCloseOnOverlayClick={false}
          contentLabel="Location Modal"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              zIndex: "1000",
            },
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              border: "1px solid #ccc",
              background: "#fff",
              overflow: "auto",
              borderRadius: "4px",
              outline: "none",
              padding: "20px",
              width: "fit-content",
              minWidth: "300px",
              maxHeight: "90vh",
            },
          }}
        >
          <h2 style={{
            textAlign: "center",
            fontWeight: "600",
            marginBottom: "24px",
          }}>
            Select location:
          </h2>
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "24px",
          }}>
            <button
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                padding: "12px 24px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "1rem",
                // Add more styles for hover state as needed
              }}
              onClick={() => handleLocation("San Jose")}
            >
              San Jose
            </button>
            <button
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                padding: "12px 24px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "1rem",
                // Add more styles for hover state as needed
              }}
              onClick={() => handleLocation("Sunnyvale")}
            >
              Sunnyvale
            </button>
            <button
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                padding: "12px 24px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "500",
                fontSize: "1rem",
                // Add more styles for hover state as needed
              }}
              onClick={() => handleLocation("Fremont")}
            >
              Fremont
            </button>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
          }}>
            <button
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "12px 24px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "500",
                // Add more styles for hover state as needed
              }}
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </Modal>
      )}


      {movies[selectedMovieIndex]?.name ? (
        <SelectedMovie {...props} />
      ) : (
        <NowShowing {...props} />

      )}

      {movies[selectedMovieIndex]?.name && <TheaterListsByMovie {...props} />}
      <UpcomingMovies {...props} />



    </div>
  );
};

export default Home;
