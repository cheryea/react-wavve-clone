import "./App.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./routes/Main";
import Tv from "./routes/Tv";
import Details from "./components/Details";
import Search from "./routes/Search";
import MyList from "./routes/MyList";

import { NavLayout } from "./Layouts/DefaultLayout";

const useFavListData = () => {
  const [favlist, setFavList] = useState([]);

  const addFavList = (newfavList, setFavicon) => {
    let set = 0;

    if (favlist.length == 0) {
      setFavList([...favlist, newfavList]);
    } else {
      favlist.forEach((list) => {
        if (list.favid === newfavList.favid) {
          set++;
        } else {
        }
      }); // 중복 검사
      if (set) {
        removeFavList(newfavList); //중복 삭제
      } else {
        setFavList([...favlist, newfavList]);
      }
    }
  };

  const removeFavList = (newfavList) => {
    const newTodos = favlist.filter((list) => list.favid !== newfavList.favid);
    setFavList(newTodos);
  };

  return {
    favlist,
    addFavList,
  };
};

function App() {
  const favlistdata = useFavListData();
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<NavLayout />}>
            <Route path="/" element={<Main favlistdata={favlistdata} />} />
            <Route path="/tv" element={<Tv favlistdata={favlistdata} />} />
            <Route
              favlistdata={favlistdata}
              path="/:genre/:id"
              element={<Details favlistdata={favlistdata} />}
            />
            <Route path="/search/:keyword" element={<Search />} />
            <Route
              path="/mylist"
              element={<MyList favlistdata={favlistdata} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
