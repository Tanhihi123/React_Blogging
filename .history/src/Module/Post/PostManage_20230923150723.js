import { ActionDelete, ActionEdit, ActionView } from "Components/Action";
import { Button } from "Components/Button";
import { Pagination } from "Components/Pagination";
import { Table } from "Components/Table";
import { LabelStatus } from "Components/label";
import { useAuth } from "Contexts/Auth-context";
import { db } from "FirebaseApp/Firebase-config";
import DashboardHeading from "Module/Dashboard/DashboardHeading";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { postStatus, userRole } from "utils/constants";

const POST_PER_PAGE = 5;
const PostManage = () => {
  const [postList, setPostList] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      const newRef = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8")
          )
        : query(colRef, where("status", "==", 1),limit(POST_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(newRef, (snapshot) => {
        setTotal(snapshot.size);
        console.log(total);
      });
      onSnapshot(newRef, (snapshot) => {
        let rs = [];
        snapshot.forEach((doc) => {
          rs.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPostList(rs);
        console.log(rs);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  function handleDeletePost(postId) {
    const docRef = doc(db, "posts", postId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(docRef);
        Swal.fire("Deleted!", "This post has been deleted.", "success");
      }
    });
  }
  const renderPostStatus = (status) => {
    switch (status) {
      case postStatus.APPROVED:
        return <LabelStatus type="success">Approve</LabelStatus>;
      case postStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case postStatus.REJECTED:
        return <LabelStatus type="danger">Rejected</LabelStatus>;
      default:
        break;
    }
  };
  const handleSearchPost = debounce((e) => {
    setFilter(e.target.value);
  }, 500);
  const handleLoadMorePost = async () => {
    const nextRef = query(
      collection(db, "posts"),
      startAfter(lastDoc || 0),
      limit(POST_PER_PAGE)
    );
    onSnapshot(nextRef, (snapshot) => {
      let rs = [];
      snapshot.forEach((doc) => {
        rs.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostList([...postList, ...rs]);
    });
    const documentSnapshots = await getDocs(nextRef);
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  const { userInfo } = useAuth();
  return (
    <div>
      <div className="mb-10 flex justify-between">
        {+userInfo.role === userRole.ADMIN ? 
        <DashboardHeading
          title="Manage Post"
          desc="Manage List Post"
        ></DashboardHeading>
        :
        <DashboardHeading
          title="Chỉ ADMIN mới có quyền truy cập"
        ></DashboardHeading>
        }
        {+userInfo.role === userRole.ADMIN &&
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 rounded-lg border border-solid border-gray-300"
            placeholder="Search post..."
            onChange={handleSearchPost}
          />
        </div>
        }
      </div>
      {+userInfo.role === userRole.ADMIN && 
      
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postList.length > 0 &&
            postList.map((post) => {
              const date = post?.createdAt?.seconds
                ? new Date(post?.createdAt?.seconds * 1000)
                : new Date();
              const formatDate = new Date(date).toLocaleDateString("vi-VI");
              return (
                <tr key={post.id}>
                  <td title={post.id}>{post.id?.slice(0, 5) + "..."}</td>
                  <td>
                    <div className="flex items-center gap-x-3">
                      <img
                        src={post.image}
                        alt=""
                        className="w-[66px] h-[55px] rounded object-cover"
                      />
                      <div className="flex-1  whitespace-pre-wrap">
                        <h3 className="font-semibold max-w-[300px]">
                          {post.title}
                        </h3>
                        <time className="text-sm text-gray-500">
                          Date: {formatDate}
                        </time>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray-500">{post.category?.name}</span>
                  </td>
                  <td>
                    <span className="text-gray-500">{post.user?.fullname}</span>
                  </td>
                  <td>{renderPostStatus(post.status)}</td>
                  <td>
                    <div className="flex items-center gap-x-3 text-gray-500">
                      <ActionView
                        onClick={() => navigate(`/${post.slug}`)}
                      ></ActionView>
                      <ActionEdit
                        onClick={() =>
                          navigate(`/manage/update-post?id=${post.id}`)
                        }
                      ></ActionEdit>
                      <ActionDelete
                        onClick={() => handleDeletePost(post.id)}
                      ></ActionDelete>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      }
      {total > postList.length && +userInfo.role === userRole.ADMIN && (
        <div className="mt-10 text-center">
          {/* <Pagination></Pagination> */}
          <Button className="mx-auto w-[200px]" onClick={handleLoadMorePost}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostManage;
