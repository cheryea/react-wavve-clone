import axios from "axios";
import React, { useState, useEffect } from "react";
import Item from "../components/Item";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Tv = () => {
  const [loading, setLoading] = useState(true);
  const [trendingtv, setTrendingTv] = useState([]);
  const [toptv, setTopTv] = useState([]);
  const [populartv, setPopularTv] = useState([]);
  const [bannermovies, setBannerMovies] = useState([]);

  const genres = "tv";
  const banner = "banner";
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  const commonParams = {
    api_key: API_KEY,
    language: "ko",
    page: 1,
  };

  function getTvTrending() {
    return axios.get(`${BASE_URL}/trending/tv/day`, { params: commonParams });
  }

  function getTvTopRated() {
    return axios.get(`${BASE_URL}/tv/top_rated`, { params: commonParams });
  }

  function getTvPopular() {
    return axios.get(`${BASE_URL}/tv/popular`, { params: commonParams });
  }

  useEffect(() => {
    axios.all([getTvTrending(), getTvTopRated(), getTvPopular()]).then(
      axios.spread((trending, toprated, popular) => {
        setTrendingTv(trending.data);
        setTopTv(toprated.data);
        setPopularTv(popular.data);
      })
    );
  }, []);

  useEffect(() => {
    if (trendingtv.results && trendingtv.results.length > 10) {
      setBannerMovies(trendingtv.results.slice(0, 5));
      setLoading(false);
    }
  }, [trendingtv]);

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
                        <h1>{video.name}</h1>
                      </div>
                    </div>
                  </section>
                </SwiperSlide>
              ))}
            </Swiper>
          </main>
          <article>
            <h2>평판이 좋은 시리즈</h2>
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
              {toptv.results.map((video) => (
                <SwiperSlide key={video.id}>
                  <Item genres={genres} video={video} />
                </SwiperSlide>
              ))}
            </Swiper>
          </article>
          <article>
            <h2>방영중인 시리즈</h2>
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
              {trendingtv.results.map((video) => (
                <SwiperSlide key={video.id}>
                  <Item genres={genres} video={video} />
                </SwiperSlide>
              ))}
            </Swiper>
          </article>
          <article>
            <h2>인기 시리즈</h2>
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
              {populartv.results.map((video) => (
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

export default Tv;
