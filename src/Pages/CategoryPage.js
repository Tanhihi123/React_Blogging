import Heading from "Components/Layout/Heading";
import Layout from "Components/Layout/Layout";
import { db } from "FirebaseApp/Firebase-config";
import PostItem from "Module/Post/PostItem";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, "posts"),
        where("category.slug", "==", params.slug),
        where("status","==",1)
      );
      onSnapshot(docRef,(snapshot) => {
        const rs = [];
        snapshot.forEach((doc) => {
            rs.push({
                id : doc.id,
                ...doc.data(),
            });
        });
        setPosts(rs);
      });
    }
    fetchData();
  },[params.slug]);
  if (posts.length <= 0) return null; 
  return (
    <Layout>
      <div className="container">
      <div className="pt-10"></div>
      <Heading>Danh mục {params.slug}</Heading>
      <div className="grid-layout grid-layout--primary">
        {posts.map((item) => (
          <PostItem key={item.id} data={item}></PostItem>
        ))}
      </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
