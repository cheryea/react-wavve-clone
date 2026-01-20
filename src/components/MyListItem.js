import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MyListItem = ({ list }) => {
  const [mylist, setMyList] = useState(null);
  const [loading, setLoading] = useState(true);

  function getFavList() {
    return axios.get(
      `${BASE_URL}/${list.genre}/${list.favid}`,
      { params: { api_key: API_KEY, language: "ko" } }
    );
  }

  useEffect(() => {
    getFavList().then((res) => {
      setMyList(res.data);
      setLoading(false);
    });
  }, [list.genre, list.favid]);

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
