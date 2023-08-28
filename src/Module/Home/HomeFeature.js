import Heading from "Components/Layout/Heading";
import { db } from "FirebaseApp/Firebase-config";
import PostFeatureItem from "Module/Post/PostFeatureItem";
import { collection, limit, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
const HomeFeatureStyles = styled.div``;
const HomeFeature = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", true),
      limit(3)
    );
    onSnapshot(queries, (snapshot) => {
      const rs = [];
      snapshot.forEach((doc) => {
        rs.push({
          id : doc.id,
          ...doc.data(),
        });
      })
      setPosts(rs);
    });
  }, []);
  if (posts.length < 0) return null;
  return (
    <div>
      <HomeFeatureStyles className="home-block">
        <div className="container">
          <Heading>Bài viết nổi bật</Heading>
          <div className="grid-layout">
            {posts.map((post) => (
              <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
            ))}
          </div>
        </div>
      </HomeFeatureStyles>
    </div>
  );
};

export default HomeFeature;
