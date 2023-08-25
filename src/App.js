import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Contexts/Auth-context";
import SignUpPage from "./Pages/SignUpPage";
import SignInPage from "Pages/SignInPage";
import HomePage from "Pages/HomePage";
import NotFoundPage from "Pages/NotFoundPage";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
