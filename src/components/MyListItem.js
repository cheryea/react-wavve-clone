import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MyListItem = ({ list, favlistdata }) => {
  const [mylist, setMyList] = useState([]);
  const [loading, setLoding] = useState(true);
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w400";

  function getFavList() {
    return axios.get(
      `https://api.themoviedb.org/3/${list.genre}/${list.favid}?api_key=c4e59022826dc465ea5620d6adaa6813&language=ko`
    );
  }

  useEffect(() => {
    axios.all([getFavList()]).then(
      axios.spread(function (FavList) {
        setMyList(FavList.data);
        setLoding(false);
      })
    );
  }, []);

  return (
    <>
      {loading ? (
        <div className="pc-widths result-message">로딩중 . . .</div>
      ) : (
        <div>
          <Link to={`/${list.genre}/${list.favid}`}>
            <img
              alt="티비 포스터 이미지"
              src={IMG_BASE_URL + mylist.poster_path}
              width="100px"
            />
          </Link>
        </div>
      )}
    </>
  );
};

export default MyListItem;
