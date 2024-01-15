import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "../../redux/favSlice";
import { HeartIcon } from "@heroicons/react/24/outline";
import wallpaper from "../../asset/wallpaper.webp";

function Fav() {
  const dispatch = useDispatch();
  const { data: movies } = useSelector((state) => state.movies);
  const favoriteMovies = useSelector((state) => state.favoriteMovies);
  const handleClick = () => {
    console.log("Button clicked!", favoriteMovies.length);
    console.log(favoriteMovies);
  };

  const removeFav = (id) => {
    console.log(id);
    dispatch(remove({ episode_id: id }));
  };

  const cards = favoriteMovies.map((movie) => (
    <div key={movie.episode_id} className="group border-2 relative p-4">
      <p className="mt-1 text-base text-gray-200">
        <strong>Title:</strong> {movie.title}
      </p>
      <p className="mt-1 text-sm text-gray-200">
        <strong>Director:</strong> {movie.director}
      </p>
      <p className="text-sm text-gray-200">
        <strong>Producer:</strong> {movie.producer}
      </p>
      <p className="text-sm text-gray-200">
        <strong>Release Date:</strong> {movie.release_date}
      </p>

      <p className="text-sm text-gray-200">
        <strong>Overview:</strong> {movie.opening_crawl}
      </p>
      <button
        type="button"
        className="py-2 px-5 mt-5 ml-20 me-2 text-sm font-medium text-gray-200 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
        onClick={() => removeFav(movie.episode_id)}
      >
        <>
          Remove
          <HeartIcon className="w-7 h-5 ml-2 text-red-800" />
        </>
      </button>
    </div>
  ));

  return (
    <>
      <div
        className="bg-white"
        style={{
          backgroundImage: `url(${wallpaper})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: 1,
        }}
      >
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-100">
            Your Favourite Star Wars Movies
          </h2>

          <>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
              {favoriteMovies.length === 0 ? (
                <>
                  <h1>No Movies on your Favourite List</h1>
                </>
              ) : (
                <>{cards}</>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );
}

export default Fav;
