import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Item from "../components/Item";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation } from "swiper/modules";

const Search = () => {
  const { keyword } = useParams();
  const [movies, setMovies] = useState([]);
  const [tvs, setTvs] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  const commonParams = {
    api_key: API_KEY,
    language: "ko",
    page: 1,
    include_adult: false,
  };

  function getSearchMovie() {
    return axios.get(`${BASE_URL}/search/movie`, { params: { ...commonParams, query: keyword } });
  }

  function getSearchTv() {
    return axios.get(`${BASE_URL}/search/tv`, { params: { ...commonParams, query: keyword } });
  }

  useEffect(() => {
    axios.all([getSearchMovie(), getSearchTv()]).then(
      axios.spread((moviesRes, tvsRes) => {
        setMovies(moviesRes.data);
        setTvs(tvsRes.data);
        setLoading(false);
      })
    );
  }, [keyword]);

  return (
    <>
      {loading ? (
        <div className="pc-widths result-message">로딩중 . . .</div>
      ) : (
        <div className="search">
          {movies.results.length + tvs.results.length ? (
            <>
              <p className="result-message pc-widths">
                "{keyword}"를 포함하는 검색 결과가&nbsp;
                {movies.results.length + tvs.results.length}개 검색되었습니다.
              </p>
              <article>
                <h2>영화</h2>
                <Swiper
                  modules={[Navigation]}
                  navigation={true}
                  className="mySwiper"
                  slidesPerView={3.25}
                  spaceBetween={8}
                  breakpoints={{
                    1366: {
                      slidesPerView: 5,
                    },
                  }}
                >
                  {movies.results.map((video) => (
                    <SwiperSlide key={video.id}>
                      <Item video={video} genres={"movie"} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </article>
              <article>
                <h2>시리즈</h2>
                <Swiper
                  modules={[Navigation]}
                  navigation={true}
                  className="mySwiper"
                  slidesPerView={3.25}
                  spaceBetween={8}
                  breakpoints={{
                    1366: {
                      slidesPerView: 5,
                    },
                  }}
                >
                  {tvs.results.map((video) => (
                    <SwiperSlide key={video.id}>
                      <Item video={video} genres={"tv"} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </article>
            </>
          ) : (
            <p className="result-message pc-widths">
              "{keyword}"를 포함하는 검색 결과가 없습니다.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
