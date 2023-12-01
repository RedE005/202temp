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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { auth } = useContext(AuthContext);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(
    parseInt(sessionStorage.getItem("selectedMovieIndex"))
  );
  const { selectedLocation, updateLocation } = useLocation();
  const [movies, setMovies] = useState([]);
  const [isFetchingMoviesDone, setIsFetchingMoviesDone] = useState(false);
  const [showLocationModal, setshowLocationModal] = useState(true);
  const [ticketPrice, setTicketPrice] = useState(20);

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

  const getTicketPrice = async () => {
    try {
      const response = await axios.get("/auth/getTicketPrice", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setTicketPrice(response.data.data.ticketPrice);
    } catch (error) {
      console.error(error);
    }
  };


  const handleTicketPrice = async (e) => {
    e.preventDefault();
    const ticketId = "65699fbe95750e67ea00ea3d";
    try {
      const response = await axios.post(
        "/auth/updateTicketPrice",
        {
          ticketId,
          ticketPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      console.log(response);
  
      toast.success("Ticket price configured to $"+ticketPrice, {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
    getTicketPrice();
  }, []);

  const props = {
    movies,
    selectedMovieIndex,
    setSelectedMovieIndex,
    auth,
    isFetchingMoviesDone,
    ticketPrice
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
          className="modal w-full max-w-lg overflow-y-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md z-90 border-4 border-solid border-gray-800"
        >
          <h2 className="text-2xl font-bold bg-white mb-4 p-4 rounded-t-md">
            Select location:
          </h2>
          <div className="flex flex-row gap-4 mb-4 py-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex-grow"
              onClick={() => handleLocation("San Jose")}
            >
              San Jose
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex-grow"
              onClick={() => handleLocation("Sunnyvale")}
            >
              Sunnyvale
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex-grow"
              onClick={() => handleLocation("Fremont")}
            >
              Fremont
            </button>
          </div>
          <div className="flex justify-end py-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {auth.role === "admin" && (
        <form className="px-6" onSubmit={handleTicketPrice}>
          <input
            type="number"
            placeholder="Configure Ticket Price"
            className="px-5 border-2 border-black rounded-md p-2 m-2"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Submit
          </button>
        </form>
      )}

      {movies[selectedMovieIndex]?.name ? (
        <SelectedMovie {...props} />
      ) : (
        <NowShowing {...props} />
      )}

      {movies[selectedMovieIndex]?.name && <TheaterListsByMovie {...props} />}
      {!movies[selectedMovieIndex]?.name && <UpcomingMovies {...props} />}
    </div>
  );
};

export default Home;
