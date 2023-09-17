import DashboardHeading from "Module/Dashboard/DashboardHeading";
import React from "react";
import UserTable from "./UserTable";
import { Button } from "Components/Button";
import { useAuth } from "Contexts/Auth-context";
import { userRole } from "utils/constants";
import { useEffect } from "react";

const UserManage = () => {
  useEffect(() => {
    document.title = "Users Manage";
  }, []);
  const { userInfo } = useAuth();
  return (
    <div>
      {+userInfo.role === userRole.ADMIN ? (
        <DashboardHeading
          title="Users"
          desc="Manage your user"
        ></DashboardHeading>
      ) : (
        <DashboardHeading title="Chỉ ADMIN mới có quyền truy cập"></DashboardHeading>
      )}
      {+userInfo.role === userRole.ADMIN && (
        <div className="flex justify-end mb-10">
          <Button kind="ghost" to="/manage/add-user">
            Add new user
          </Button>
        </div>
      )}
      {+userInfo.role === userRole.ADMIN && <UserTable></UserTable>}
    </div>
  );
};

export default UserManage;
