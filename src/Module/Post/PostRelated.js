import Heading from "Components/Layout/Heading";
import { db } from "FirebaseApp/Firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import PostItem from "./PostItem";
import { Swiper, SwiperSlide } from "swiper/react";

const PostRelated = ({ categoryId = "" }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const docRef = query(
      collection(db, "posts"),
      where("categoryId", "==", categoryId)
    );
    onSnapshot(docRef, (snapshot) => {
      const rs = [];
      snapshot.forEach((doc) => {
        rs.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(rs);
    });
  }, [categoryId]);
  if (!categoryId && posts.length <= 0) return null;
  return (
    <div className="post-related">
      <Heading>Bài viết liên quan</Heading>
      {/* <div className="grid-layout grid-layout--primary"> */}
        {/* {posts.map((item) => ( */}
          {/* <PostItem key={item.id} data={item}></PostItem> */}
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
                  <PostItem data={post}></PostItem>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        {/* ))} */}
      {/* </div> */}
    </div>
  );
};

export default PostRelated;
