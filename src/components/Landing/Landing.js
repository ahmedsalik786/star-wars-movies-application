import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moviesInstance } from "../../utils/axios";
import { fetchMovies } from "../../redux/moviesSlice";
import { HeartIcon } from "@heroicons/react/24/outline";
import { add, remove } from "../../redux/favSlice";

function Landing() {
  const dispatch = useDispatch();
  const { data: moviesList } = useSelector((state) => state.movies);
  const favoriteMovies = useSelector((state) => state.favoriteMovies);

  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([true]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await moviesInstance.get(`/films`);
      dispatch(fetchMovies(response.results));
      // console.log(response.results);
      setMovies(response.results);
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  const addFav = (movie) => {
    // console.log("testing addFav", movie.title);
    const isAlreadyAdded = favoriteMovies.some(
      (favMovie) => favMovie.episode_id === movie.episode_id
    );

    if (!isAlreadyAdded) {
      dispatch(add(movie));
      console.log("Movie added to favorites:", movie.title);
    } else {
      console.log("Movie is removed from favorites!");
      dispatch(remove({ episode_id: movie.episode_id }));
    }
  };

  const cards = moviesList.map((movie) => (
    <div key={movie.episode_id} className="group border-2 relative p-4">
      <p className="mt-1 text-sm text-gray-500">
        <strong>Title:</strong> {movie.title}
      </p>
      <p className="mt-1 text-sm text-gray-500">
        <strong>Director:</strong> {movie.director}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Producer:</strong> {movie.producer}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Release Date:</strong> {movie.release_date}
      </p>

      <button
        type="button"
        className="py-2 px-5 mt-5 ml-20 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
        onClick={() => addFav(movie)}
      >
        {favoriteMovies.some(
          (favMovie) => favMovie.episode_id === movie.episode_id
        ) ? (
          <>
            Remove from
            <HeartIcon className="w-7 h-5 ml-2 text-red-800" />
          </>
        ) : (
          <>
            Favourite
            <HeartIcon className="w-5 h-5 ml-2 text-gray-500" />
          </>
        )}
      </button>
    </div>
  ));

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Star Wars Movies
          </h2>
          {isLoading ? (
            <>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {cards}
              </div>
            </>
          ) : (
            <>
              <button
                disabled
                type="button"
                className="py-2 px-5 mt-5 ml-20 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Loading...
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Landing;
