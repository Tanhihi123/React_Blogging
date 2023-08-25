import Heading from "Components/Layout/Heading";
import PostFeatureItem from "Module/Post/PostFeatureItem";
import React from "react";
import styled from "styled-components";
const HomeFeatureStyles = styled.div``;
const HomeFeature = () => {
  return (
    <div>
      <HomeFeatureStyles className="home-block">
        <div className="container">
          <Heading>Bài viết nổi bật</Heading>
          <div className="grid-layout">
            <PostFeatureItem></PostFeatureItem>
            <PostFeatureItem></PostFeatureItem>
            <PostFeatureItem></PostFeatureItem>
          </div>
        </div>
      </HomeFeatureStyles>
    </div>
  );
};

export default HomeFeature;
