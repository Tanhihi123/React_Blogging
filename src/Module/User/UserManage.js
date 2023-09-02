import DashboardHeading from "Module/Dashboard/DashboardHeading";
import React from "react";
import UserTable from "./UserTable";
import { Button } from "Components/Button";

const UserManage = () => {
  return (
    <div>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      ></DashboardHeading>
      <div className="flex justify-end mb-10">
      <Button kind="ghost" to="/manage/add-user">Add new user</Button>
      </div>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
