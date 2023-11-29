import {
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import React, { useRef, useState, useEffect } from "react";

const MovieLists = ({ movies, search, handleDelete }) => {
  const scrollRef = useRef(null);
  const [isScrolledLeft, setIsScrolledLeft] = useState(false);
  const [isScrolledRight, setIsScrolledRight] = useState(true);
  const filteredMovies = movies?.filter((movie) =>
    movie.name.toLowerCase().includes(search?.toLowerCase() || "")
  );

  const checkScrollButtons = () => {
    setIsScrolledLeft(scrollRef.current.scrollLeft > 0);
    setIsScrolledRight(
      scrollRef.current.scrollLeft <
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth
    );
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollRef.current;
    container.addEventListener("scroll", checkScrollButtons);

    return () => container.removeEventListener("scroll", checkScrollButtons);
  }, []);

  const scroll = (direction) => {
    if (direction === "left") {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };
  if (!filteredMovies.length) {
    return <div className="text-center text-xl">No movies found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {isScrolledLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center bg-black bg-opacity-50 p-2 text-white rounded-full"
          aria-label="Scroll left"
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto snap-x snap-mandatory"
        style={{
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          overflow: "hidden",
        }} // This line hides the scrollbar in Firefox
      >
        {filteredMovies.map((movie, index) => (
          <div
            key={index}
            className="snap-center"
            style={{ minWidth: "18rem", height: "25rem" }}
          >
            {" "}
            {/* Adjust height as needed */}
            <div className="group relative h-full">
              <img
                src={movie.img}
                alt={movie.name}
                className="rounded-lg shadow-lg transition-all duration-300 group-hover:opacity-75 object-cover h-full w-full" // object-cover ensures equal heights
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h5 className="text-lg text-white truncate">{movie.name}</h5>
                <p className="text-sm text-gray-300">
                  Length: {movie.length || "-"} min
                </p>
              </div>
              <button
                onClick={() => handleDelete(movie)}
                className="absolute top-0 right-0 m-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300"
                aria-label="Delete movie"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {isScrolledRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center bg-black bg-opacity-50 p-2 text-white rounded-full"
          aria-label="Scroll right"
        >
          <ChevronRightIcon className="h-8 w-8" />
        </button>
      )}
    </div>
  );
};

export default MovieLists;
