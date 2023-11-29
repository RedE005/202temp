import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import ShowtimeDetails from "../components/ShowtimeDetails";
import { AuthContext } from "../context/AuthContext";

const Tickets = () => {
  const { auth } = useContext(AuthContext);
  const [tickets, setTickets] = useState({ future: [], past: [] });
  const [rewardPoints, setRewardPoints] = useState(0);
  const [isFetchingticketsDone, setIsFetchingticketsDone] = useState(false);
  const [membership, setMembership] = useState("");

  const fetchTickets = async () => {
    try {
      setIsFetchingticketsDone(false);
      const response = await axios.get("/auth/tickets", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      const now = new Date();
      const thirtyDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);

      const futureTickets = response.data.data.tickets.filter(ticket => {
        const showtimeDate = new Date(ticket.showtime.showtime);
        return showtimeDate > now;
      });

      const pastTickets = response.data.data.tickets.filter(ticket => {
        const showtimeDate = new Date(ticket.showtime.showtime);
        return showtimeDate <= now && showtimeDate > thirtyDaysAgo;
      });

      futureTickets.sort((a, b) => new Date(a.showtime.showtime) - new Date(b.showtime.showtime));
      pastTickets.sort((a, b) => new Date(b.showtime.showtime) - new Date(a.showtime.showtime));

      setTickets({ future: futureTickets, past: pastTickets });
      setRewardPoints(response.data.data.rewardPoints);
      setMembership(response.data.data.membership);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingticketsDone(true);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="flex min-h-screen flex-col gap-4 bg-gradient-to-br from-indigo-900 to-blue-500 pb-8 text-gray-900 sm:gap-8">
      <Navbar />
      <div className="mx-4 flex h-fit flex-col gap-4 rounded-md bg-gradient-to-br from-indigo-200 to-blue-100 p-4 drop-shadow-xl sm:mx-8 sm:p-6">
        <div className="mx-4 flex h-fit flex-row gap-4 from-indigo-200 to-blue-100 p-4 drop-shadow-xl sm:mx-1 sm:p-2">
          <div className="flex items-center  border-2 border-indigo-900 rounded-md w-1/2 mb-4 ">
            <h2 className="text-3xl font-bold text-gray-900 py-9 px-4">Membership Type: {membership}</h2>
          </div>
          <div className="flex items-center  border-2 border-indigo-900 rounded-md w-1/2 mb-4 ">
            <h2 className="text-3xl font-bold text-gray-900 py-9 px-4">Reward Points: {rewardPoints}</h2>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">My Tickets</h2>
        {isFetchingticketsDone && tickets.future.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 min-[1920px]:grid-cols-3">
            {tickets.future.map((ticket, index) => (
              <div className="flex flex-col" key={index}>
                <ShowtimeDetails showtime={ticket.showtime} />
                <div className="flex h-full flex-col justify-between rounded-b-lg bg-gradient-to-br from-indigo-100 to-white text-center text-lg drop-shadow-lg md:flex-row">
                  <div className="flex h-full flex-col items-center gap-x-4 px-4 py-2 md:flex-row">
                    <p className="whitespace-nowrap font-semibold">
                      Seats :{" "}
                    </p>
                    <p className="text-left">
                      {ticket.seats
                        .map((seat) => seat.row + seat.number)
                        .join(", ")}
                    </p>
                    <p className="whitespace-nowrap">
                      ({ticket.seats.length} seats)
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">
            You have not purchased any tickets yet
          </p>
        )}
        <h2 className="text-3xl font-bold text-gray-900">History - Past 30 Days</h2>
        {isFetchingticketsDone && tickets.past.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 min-[1920px]:grid-cols-3">
            {tickets.past.map((ticket, index) => (
              <div className="flex flex-col" key={index}>
                <ShowtimeDetails showtime={ticket.showtime} />
                <div className="flex h-full flex-col justify-between rounded-b-lg bg-gradient-to-br from-indigo-100 to-white text-center text-lg drop-shadow-lg md:flex-row">
                  <div className="flex h-full flex-col items-center gap-x-4 px-4 py-2 md:flex-row">
                    <p className="whitespace-nowrap font-semibold">
                      Seats :{" "}
                    </p>
                    <p className="text-left">
                      {ticket.seats
                        .map((seat) => seat.row + seat.number)
                        .join(", ")}
                    </p>
                    <p className="whitespace-nowrap">
                      ({ticket.seats.length} seats)
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">
            No ticket history in the past 30 days.
          </p>
        )}
        {isFetchingticketsDone ? null : <Loading />}
      </div>
    </div>
  );
};

export default Tickets;
