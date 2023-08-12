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
  const [loading, setLoding] = useState(true);

  function getSearchMovie() {
    return axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=c4e59022826dc465ea5620d6adaa6813&language=ko&query=${keyword}&page=1&include_adult=false`
    );
  }

  function getSearchTv() {
    return axios.get(
      `https://api.themoviedb.org/3/search/tv?api_key=c4e59022826dc465ea5620d6adaa6813&language=ko&query=${keyword}&page=1&include_adult=false`
    );
  }

  useEffect(() => {
    axios.all([getSearchMovie(), getSearchTv()]).then(
      axios.spread(function (movies, tvs) {
        setMovies(movies.data);
        setTvs(tvs.data);
        setLoding(false);
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
            <>"{keyword}"를 포함하는 검색 결과가 없습니다.</>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
