import Layout from "Components/Layout/Layout";
import HomeBanner from "Module/Home/HomeBanner";
import HomeFeature from "Module/Home/HomeFeature";
import HomeNewest from "Module/Home/HomeNewest";
import React, { useEffect } from "react";
import styled from "styled-components";
const HomePageStyles = styled.div``;
const HomePage = () => {
  useEffect(() => {
    document.title = "Home Page";
  })
  return (
    <HomePageStyles>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
      </Layout>
    </HomePageStyles>
  );
};

export default HomePage;
