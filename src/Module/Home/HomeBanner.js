import Avatar from "Components/Avatar/Avatar";
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
    top: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 75%;
    &-content {
      max-width: 400px;
      color: white;
    }
    &-heading {
      font-size: 36px;
      margin-bottom: 20px;
    }
    &-desc {
      line-height: 1.75;
      margin-bottom: 40px;
    }
  }
  @media screen and (max-width: 768px) {
    .banner {
      &-avatar {
        display: none;
      }
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
              Xin tự giới thiệu , mình là một front-end developer trẻ tuổi , hy
              vọng các bạn sẽ có một trải nghiệm tốt nhất !! Thanks a lot ,
              peace .......
            </p>
            <Button onClick={() => navigate("/sign-in")} kind="secondary">
              Get started
            </Button>
          </div>
          <div className="banner-avatar">
            <Avatar></Avatar>
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
