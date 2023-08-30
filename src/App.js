import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Contexts/Auth-context";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "Pages/SignInPage";
import HomePage from "Pages/HomePage";
import NotFoundPage from "Pages/NotFoundPage";
import PostDetailsPage from "Pages/PostDetailsPage";
import DashboardLayout from "Module/Dashboard/DashboardLayout";
import DashboardPage from "Pages/DashboardPage";
import PostManage from "Module/Post/PostManage";
import PostAddNew from "Module/Post/PostAddNew";
import CategoryManage from "Module/Category/CategoryManage";
import CategoryAddNew from "Module/Category/CategoryAddNew";
import UserManage from "Module/User/UserManage";
import UserAddNew from "Module/User/UserAddNew";
import UserProfile from "Module/User/UserProfile";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          <Route
            path="/:slug"
            element={<PostDetailsPage></PostDetailsPage>}
          ></Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/manage/post"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            ></Route>
            <Route
              path="/manage/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>
            <Route
              path="/manage/add-category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
            <Route
              path="/manage/user"
              element={<UserManage></UserManage>}
            ></Route>
            <Route
              path="/manage/add-user"
              element={<UserAddNew></UserAddNew>}
            ></Route>
            <Route
              path="/profile"
              element={<UserProfile></UserProfile>}
            ></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
