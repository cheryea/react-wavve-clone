import axios from "axios";
import React, { useState, useEffect } from "react";
import Item from "../components/Item";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const commonParams = {
  api_key: API_KEY,
  language: "ko",
  page: 1,
  region: "KR",
};

const Main = ({ favlistdata }) => {
  const [loading, setLoading] = useState(true);
  const genres = "movie";
  const [nowmovie, setNowMovie] = useState([]);
  const [popularmovie, setPopularMovie] = useState([]);
  const [topmovie, setTopMovie] = useState([]);
  const [upcomingmovie, setUpcomingMovie] = useState([]);
  const banner = "banner";
  const [bannermovies, setBannerMovies] = useState([]);

  function getMovieNowPlaying() {
    return axios.get(`${BASE_URL}/movie/now_playing`, {
      params: commonParams,
    });
  }

  function getMoviePopular() {
    return axios.get(`${BASE_URL}/movie/popular`, {
      params: commonParams,
    });
  }

  function getMovieTopRated() {
    return axios.get(`${BASE_URL}/movie/top_rated`, {
      params: commonParams,
    });
  }

  function getMovieUpcoming() {
    return axios.get(`${BASE_URL}/movie/upcoming`, {
      params: commonParams,
    });
  }

  useEffect(() => {
    axios
      .all([
        getMovieNowPlaying(),
        getMoviePopular(),
        getMovieTopRated(),
        getMovieUpcoming(),
      ])
      .then(
        axios.spread((now, popular, toprated, upcoming) => {
          setNowMovie(now.data);
          setPopularMovie(popular.data);
          setTopMovie(toprated.data);
          setUpcomingMovie(upcoming.data);
        })
      );
  }, []);


  useEffect(() => {
    if (popularmovie.results && popularmovie.results.length > 10) {
      setBannerMovies(popularmovie.results.slice(0, 5));
      setLoading(false);
    }
  }, [popularmovie]);

  return (
    <>
      {loading ? (
        <div className="pc-widths result-message">로딩중 . . .</div>
      ) : (
        <div className="main">
          <main>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              className="mySwiper"
              slidesPerView={1}
              spaceBetween={18}
              loop={true}
              centeredSlides={true}
              autoplay={{ delay: 2000 }}
              breakpoints={{
                1366: {
                  slidesPerView: "auto",
                },
              }}
            >
              {bannermovies.map((video) => (
                <SwiperSlide key={video.id}>
                  <section>
                    <div>
                      <Item genres={genres} video={video} banner={banner} />
                      <div className="banner-shadow mobile-onlys"></div>
                      <div className="banner-title">
                        <h1>{video.title}</h1>
                      </div>
                    </div>
                  </section>
                </SwiperSlide>
              ))}
            </Swiper>
          </main>
          <article>
            <h2>요즘 영화, 이것만 봐도 영잘알</h2>
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
              slidesPerView={3.25}
              spaceBetween={8}
              breakpoints={{
                1366: {
                  slidesPerView: 5,
                },
              }}
            >
              {popularmovie.results.map((video) => (
                <SwiperSlide key={video.id}>
                  <Item genres={genres} video={video} />
                </SwiperSlide>
              ))}
            </Swiper>
          </article>
          <article>
            <h2>현재 상영중인 영화</h2>
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
              {nowmovie.results.map((video) => (
                <SwiperSlide key={video.id}>
                  <Item genres={genres} video={video} />
                </SwiperSlide>
              ))}
            </Swiper>
          </article>
          <article>
            <h2>믿고 보는 웨이브 에디터 추천작</h2>
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
              slidesPerView={3.25}
              spaceBetween={8}
              breakpoints={{
                1366: {
                  slidesPerView: 5,
                },
              }}
            >
              {topmovie.results.map((video) => (
                <SwiperSlide key={video.id}>
                  <Item genres={genres} video={video} />
                </SwiperSlide>
              ))}
            </Swiper>
          </article>
          <article>
            <h2>두근두근 Coming Soon</h2>
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
              slidesPerView={3.25}
              spaceBetween={8}
              breakpoints={{
                1366: {
                  slidesPerView: 5,
                },
              }}
            >
              {upcomingmovie.results.map((video) => (
                <SwiperSlide key={video.id}>
                  <Item genres={genres} video={video} />
                </SwiperSlide>
              ))}
            </Swiper>
          </article>
        </div>
      )}
    </>
  );
};

export default Main;
