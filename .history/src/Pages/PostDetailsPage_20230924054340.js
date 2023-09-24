import Layout from "Components/Layout/Layout";
import PostCategory from "Module/Post/PostCategory";
import PostImage from "Module/Post/PostImage";
import PostMeta from "Module/Post/PostMeta";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PageNotFound from "./NotFoundPage";
import { useEffect } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "FirebaseApp/Firebase-config";
import { useState } from "react";
import parse from "html-react-parser";
import AuthorBox from "Components/Author/AuthorBox";
import PostRelated from "Module/Post/PostRelated";
import slugify from "slugify";
import PostOption from "Module/Post/PostOption";
import PostComment from "Module/Post/PostComment";
import PostUserComment from "Module/Post/PostUserComment";

const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    }
  }
`;
const PostDetailsPage = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState({});
  const [comment, setComment] = useState([]);
  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      const colRef = query(
        collection(db, "posts"),
        where("slug", "==", slug),
        where("status", "==", 1)
      );
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() && setPostInfo(doc.data());
        });
      });
    }
    async function fetchDataComment() {
      if(!slug) return;
      const q = query(collection(db, "comment"));
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => {
          clg
        })
      })
    }
    fetchDataComment();
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);
  const { user } = postInfo;
  const date = user?.createdAt?.seconds
    ? new Date(user?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  if (!slug) return <PageNotFound></PageNotFound>;
  if (!postInfo.title) return null;
  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="fixed hidden md:block left-10 top-[300px]">
          <PostOption></PostOption>
        </div>
        <div className="container">
          <div className="post-header">
            <PostImage
              url={postInfo.image}
              className="post-feature"
            ></PostImage>
            <div className="post-info">
              <PostCategory className="mb-6" to={postInfo.category?.slug}>
                {postInfo.category?.name}
              </PostCategory>
              <h1 className="post-heading">{postInfo.title}</h1>
              <PostMeta
                to={slugify(user?.fullname || "", { lower: true })}
                authorName={user?.fullname}
                date={formatDate}
              ></PostMeta>
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">{parse(postInfo.content || "")}</div>
            <AuthorBox userId={user.id}></AuthorBox>
          </div>
          <PostComment></PostComment>
          <PostUserComment></PostUserComment>
          <PostRelated categoryId={postInfo?.categoryId}></PostRelated>
        </div>
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
