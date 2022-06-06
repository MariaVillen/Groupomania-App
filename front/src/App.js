
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./helpers/RequireAuth";
import PersistLogin from "./helpers/persist-login";

// Authentication Components
import LoginLayout from "./pages/login-layout/LoginLayout";
import LoginForm from "./components/login-form/LoginForm";
import SignUpForm from "./components/singup-form/SignUpForm";
import ForgotenPass from "./components/forgottenpass/ForgotenPass";
import Unauthorized from "./pages/unauthorized/Unauthorized";

// Home page Components
import AppLayout from "./pages/app-layout/AppLayout";
import HomePage from "./pages/home/Home";
import PostDetail from "./components/post-detail/PostDetail";
import PostList from "./components/post-list/PostList";

// Profile components
import ProfilePage from "./pages/profile/Profile";

// Admin page components
import AdminPage from "./pages/admin/Admin";
import UsersPannel from "./components/user-pannel/UserPannel.component";
import ReportPannel from "./components/reports-pannel/ReportPannel.component";

// generic component
import NotFound from "./pages/notfound/NotFound";

// Roles
function App() {
  const ROLES = {
    admin: 5150,
    user: 2001,
  };

  // Verifty the state of logged or not of user

  return (
    <Routes>
      {/* App Routes */}
      <Route element={<PersistLogin />}>
        <Route
          element={<RequireAuth allowedRoles={[ROLES.user, ROLES.admin]} />}
        >
          <Route element={<AppLayout rolesList={ROLES} />}>
            <Route path="/" element={<HomePage />}>
              <Route path="/" element={<PostList/>}/>
              <Route path="/post/:id" element={<PostDetail/>}/>
            </Route>
            <Route path="profile/:id" element={<ProfilePage/>} />
          </Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
          <Route element={<AppLayout rolesList={ROLES} />}>
            <Route path="admin" element={<AdminPage />}>
              <Route index path="" element={<UsersPannel />} />
              <Route path="reports" element={<ReportPannel />} />
            </Route>
          </Route>
        </Route>
      </Route>

      {/* Authentication Routes */}
      <Route path="/" element={<LoginLayout />}>
        <Route index path="login" element={<LoginForm />} />
        <Route path="register" element={<SignUpForm />} />
        <Route path="forgottenPass" element={<ForgotenPass />} />
      </Route>

      {/* Cath All */}
      <Route path="/*" element={<NotFound />} />
      <Route path="unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}

export default App;
