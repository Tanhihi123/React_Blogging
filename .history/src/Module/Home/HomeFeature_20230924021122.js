import Heading from "Components/Layout/Heading";
import { db } from "FirebaseApp/Firebase-config";
import PostFeatureItem from "Module/Post/PostFeatureItem";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
const HomeFeatureStyles = styled.div``;
const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(6)
    );
    onSnapshot(queries, (snapshot) => {
      const rs = [];
      snapshot.forEach((doc) => {
        rs.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(rs);
    });
  }, []);
  if (posts.length < 0) return null;
  return (
    <div>
      <HomeFeatureStyles className="home-block">
        <div className="blog container">
          <Heading>Bài viết nổi bật</Heading>
          <div
            className={`swiper-layout`}
          >
            <Swiper
              grabCursor={"true"}
              // spaceBetween={30}
              // slidesPerView={3}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 30,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="swiper-slide"
            >
              {posts.map((post) => (
                <SwiperSlide key={post.id}>
                  <PostFeatureItem data={post}></PostFeatureItem>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </HomeFeatureStyles>
    </div>
  );
};

export default HomeFeature;
