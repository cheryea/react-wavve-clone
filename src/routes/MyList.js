import React from "react";
import MyListItem from "../components/MyListItem";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Navigation } from "swiper/modules";

const MyList = ({ favlistdata }) => {
  return (
    <>
      {favlistdata.favlist.length == 0 ? (
        <>
          <p className="pc-widths result-message">
            관심있는 컨텐츠가 있으시다면 컨텐츠의 관심(♡) 버튼을 눌러보세요.
          </p>
        </>
      ) : (
        <article>
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
            {favlistdata.favlist.map((list) => (
              <SwiperSlide key={list.id}>
                <MyListItem
                  key={list.id}
                  list={list}
                  favlistdata={favlistdata}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </article>
      )}
    </>
  );
};

export default MyList;
