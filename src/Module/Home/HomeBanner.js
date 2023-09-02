import { Button } from "Components/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const HomeBannerStyles = styled.div`
  height: 520px;
  padding: 40px 0;
  background: linear-gradient(155deg, #00b4aa 6.67%, #a4d96c 84.1%);
  margin-bottom: 60px;
  .banner {
    position: absolute;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-content {
      max-width: 400px;
      color: white;
    }
    &-image {
      width: 500px;
      height: 800px;
      transform: translateX(65%) translateY(18%);
    }
    &-heading {
      font-size: 36px;
      margin-bottom: 20px;
    }
    &-desc {
      line-height: 1.75;
      margin-bottom: 40px;
    }
    &-img {
      width: 500px;
      height: 500px;
      object-fit: contain;
    }
  }
`;

const HomeBanner = () => {
    const navigate = useNavigate();
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Blogging by Tan</h1>
            <p className="banner-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus, laboriosam. Perspiciatis, et voluptatum! Rerum
              incidunt recusandae quos officia ratione fuga necessitatibus,
              inventore nulla beatae numquam. Minus quam consequatur nobis
              consectetur!
            </p>
            <Button onClick={() => navigate("/sign-in")} kind="secondary">Get started</Button>
          </div>
          <div className="banner-image">
            <img src="/Tansama.png" alt="" className="banner-img" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
