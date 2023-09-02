import { ActionDelete, ActionEdit } from "Components/Action";
import { Table } from "Components/Table";
import { LabelStatus } from "Components/label";
import { db } from "FirebaseApp/Firebase-config";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { userRole, userStatus } from "utils/constants";

const UserTable = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (snapshot) => {
      const rs = [];
      snapshot.forEach((doc) => {
        rs.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setUserList(rs);
    });
  });
  const renderRole = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MOD:
        return "Mod";
      case userRole.USER:
        return "User";
      default:
        break;
    }
  };
  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.PENDING:
        return <LabelStatus type="warning">PENDING</LabelStatus>;
      case userStatus.BAN:
        return <LabelStatus type="danger">BAN</LabelStatus>;
      default:
        break;
    }
  };
  const handleDeleteUser = async (user) => {
    const colRef = doc(db, "users", user.id);
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
        await deleteDoc(colRef);
        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    });

  }
  const renderUserItem = (user) => {
    return (
      <tr key={user.id}>
        <td title={user.id}>{user?.id.slice(0, 3) + "..."}</td>
        <td className="whitespace-nowrap">
          <div className="flex items-center gap-x-3">
            <img
              src={user?.avatar}
              alt=""
              className="w-10 h-10 object-cover rounded-md flex-shrink-0"
            />
            <div className="flex-1">
              <h3>{user.fullname}</h3>
              <time className="text-sm text-gray-400">
                {new Date(user?.createdAt.seconds * 1000).toLocaleDateString(
                  "vi-VI"
                )}
              </time>
            </div>
          </div>
        </td>
        <td>{user?.username}</td>
        <td title={user.email}>{user?.email.slice(0, 5) + "..."}</td>
        <td>{renderLabelStatus(+user.status)}</td>
        <td>{renderRole(+user.role)}</td>
        <td>
          <div className="flex gap-5 text-gray-400">
            <ActionEdit
              onClick={() => navigate(`/manage/update-user?id=${user.id}`)}
            ></ActionEdit>
            <ActionDelete
              onClick={() => handleDeleteUser(user)}
            ></ActionDelete>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>Username</th>
            <th>Email address</th>
            <th>Status</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 && userList.map((user) => renderUserItem(user))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
