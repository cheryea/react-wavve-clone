import axios from "axios";
import React, { useState, useEffect } from "react";
import Item from "../components/Item";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Tv = () => {
  const [loading, setLoding] = useState(true);
  const genres = "tv";
  const [trendingtv, setTrendingTv] = useState([]);
  const [toptv, setTopTv] = useState([]);
  const [populartv, setPopularTv] = useState([]);
  const banner = "banner";
  const [bannermovies, setBannerMovies] = useState([]);

  function getTvTrending() {
    return axios.get(
      "https://api.themoviedb.org/3/trending/tv/day?language=ko-KR&api_key=c4e59022826dc465ea5620d6adaa6813"
    );
  }

  function getTvTopRated() {
    return axios.get(
      "https://api.themoviedb.org/3/tv/top_rated?language=ko-KR&api_key=c4e59022826dc465ea5620d6adaa6813"
    );
  }

  function getTvPopular() {
    return axios.get(
      "http://api.themoviedb.org/3/tv/popular?api_key=c4e59022826dc465ea5620d6adaa6813"
    );
  }

  useEffect(() => {
    axios.all([getTvTrending(), getTvTopRated(), getTvPopular()]).then(
      axios.spread(function (trending, toprated, popular) {
        setTrendingTv(trending.data);
        setTopTv(toprated.data);
        setPopularTv(popular.data);
      })
    );
  }, []);

  useEffect(() => {
    if (trendingtv.results && trendingtv.results.length > 10) {
      setBannerMovies(trendingtv.results.slice(0, 5));
      setLoding(false);
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
