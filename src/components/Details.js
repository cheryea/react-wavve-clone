import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Item from "../components/Item";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation } from "swiper/modules";

const Details = ({ favlistdata }) => {
  const { genre, id } = useParams();
  const [movies, setMovies] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [credits, setCredits] = useState([]);
  const [loading, setLoding] = useState(true);
  const [openTab, setOpenTab] = useState(1);
  const [favicon, setFavicon] = useState(0);
  const genres = String(genre);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  function getMovie() {
    return axios.get(
      `https://api.themoviedb.org/3/${genre}/${id}?api_key=c4e59022826dc465ea5620d6adaa6813&language=ko`
    );
  }

  function getSimilarMovie() {
    return axios.get(
      `https://api.themoviedb.org/3/${genre}/${id}/similar?api_key=c4e59022826dc465ea5620d6adaa6813&language=ko`
    );
  }

  function getCreditsrMovie() {
    return axios.get(
      `https://api.themoviedb.org/3/${genre}/${id}/credits?api_key=c4e59022826dc465ea5620d6adaa6813&language=ko`
    );
  }

  useEffect(() => {
    axios.all([getMovie(), getSimilarMovie(), getCreditsrMovie()]).then(
      axios.spread(function (movie, similar, credits) {
        setMovies(movie.data);
        setSimilar(similar.data);
        setCredits(credits.data);
        setLoding(false);
      })
    );
  }, [id]);

  const favicons = () => {
    const tooFavlist = favlistdata.favlist.filter((list) => list.favid === id);
    if (tooFavlist.length === 0) {
      setFavicon(0);
    } else {
      setFavicon(1);
    }
  };

  useEffect(() => {
    favicons();
  });

  const commitfav = (e) => {
    e.preventDefault();
    const favid = String(id);
    const newfavList = {
      favid,
      genre,
    };
    favlistdata.addFavList(newfavList, setFavicon);
  };

  const commitsummary = () => {
    window.scrollTo({
      top: 470,
      behavior: "smooth",
    });
    setOpenTab(2);
  };

  return (
    <>
      {loading ? (
        <div className="pc-widths result-message">로딩중 . . .</div>
      ) : (
        <div className="details pc-widths">
          <div className="poster-box">
            <div className="poster-box-left-shadow"></div>
            <div className="poster-box-img">
              <img
                alt="티비 포스터 이미지"
                src={
                  "https://image.tmdb.org/t/p/original" + movies.backdrop_path
                }
              />
            </div>
            <div className="inner-wrapper">
              <div className="flexs">
                <div>
                  <h3>{movies.title || movies.name}</h3>
                  <ul className="flexs">
                    <li>
                      {(movies.release_date || movies.first_air_date).substr(
                        0,
                        4
                      )}
                    </li>
                    <li>{movies.runtime}분</li>
                    <li className="flexs">
                      {movies?.genres.map((genre) => (
                        <p key={genre.id}>{genre.name},</p>
                      ))}
                    </li>
                  </ul>
                </div>
                <div className="favicon" onClick={commitfav}>
                  <div className={favicon ? "hearton" : "heartoff"}></div>
                  관심
                </div>
              </div>
              <div className="summary" onClick={commitsummary}>
                <span>{truncate(movies.overview, 120)}...</span>
                <span className="summary-button cursor-pointers">더보기</span>
              </div>
            </div>
          </div>
          <article className="bottom-tab-container">
            <ul className="flexs">
              <li
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                className={openTab === 1 ? "active" : ""}
              >
                추천
              </li>
              <li
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                className={openTab === 2 ? "active" : ""}
              >
                상세 정보
              </li>
            </ul>
            <div className={openTab === 1 ? "display-blocks" : "display-nones"}>
              <h2>비슷한 컨텐츠</h2>
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
                {similar.results.map((video) => (
                  <SwiperSlide key={video.id}>
                    <Item genres={genres} video={video} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={openTab === 2 ? "flexs" : "display-nones"}>
              <div className="detail-info-img pc-onlys-flex">
                <img
                  alt="티비 포스터 이미지"
                  src={
                    "https://image.tmdb.org/t/p/original" + movies.poster_path
                  }
                />
              </div>
              <ul className="detail-info">
                <li>
                  <div className="detail-info-img mobile-onlys">
                    <img
                      alt="티비 포스터 이미지"
                      src={
                        "https://image.tmdb.org/t/p/original" +
                        movies.poster_path
                      }
                    />
                  </div>
                  <div className="detail-info-overview">
                    <span>{movies.title || movies.name}</span>
                    <p>{movies.overview}</p>
                  </div>
                </li>
                <li>
                  <span>개요</span>
                  <p>
                    {movies.production_countries[0].name},&nbsp;
                    {(movies.release_date || movies.first_air_date).substr(
                      0,
                      4
                    )}
                    년
                  </p>
                </li>
                <li>
                  <span>장르</span>
                  <p>
                    {movies?.genres.map((genre) => (
                      <span key={genre.id}>#{genre.name},&nbsp;</span>
                    ))}
                  </p>
                </li>
                <li>
                  <span>출연</span>
                  <p>
                    {credits?.cast.slice(0, 3).map((actor) => (
                      <span key={actor.id}>{actor.name},&nbsp;</span>
                    ))}
                  </p>
                </li>
              </ul>
            </div>
          </article>
        </div>
      )}
    </>
  );
};

export default Details;
