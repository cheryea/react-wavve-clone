import React from "react";
import { Link } from "react-router-dom";

const Item = ({ genres, video, banner }) => {
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w400";
  const BANNER_IMG_BASE_URL = "https://image.tmdb.org/t/p/original";
  return (
    <>
      {genres === "movie" ? (
        <Link to={`/movie/${video.id}`}>
          <img
            alt="영화 포스터 이미지"
            src={
              banner
                ? BANNER_IMG_BASE_URL + video.backdrop_path
                : video.poster_path && IMG_BASE_URL + video.poster_path
            }
          />
        </Link>
      ) : (
        <Link to={`/tv/${video.id}`}>
          <img
            alt="티비 포스터 이미지"
            src={
              banner
                ? BANNER_IMG_BASE_URL + video.backdrop_path
                : IMG_BASE_URL + video.poster_path
            }
          />
        </Link>
      )}
    </>
  );
};

export default Item;
