//layout
import LayoutStart from "../layouts/LayoutStart";
import LayoutHome from "../layouts/LayoutHome";

//pages home
import Home from "../pages/Home/Home";
import Profile from "../pages/Home/Profile";
import Setting from "../pages/Home/Setting";
import Post from "../pages/Home/Post";

//pages start
import Login from "../pages/Start/Login";
import Register from "../pages/Start/Register";

//error404
import Error404 from "../pages/Error404";

const routes = [
  {
    path: "/home",
    component: LayoutHome,
    exact: false,
    routes: [
      {
        path: "/home",
        component: Home,
        exact: true,
      },
      {
        path: "/home/profile",
        component: Profile,
        exact: true,
      },
      {
        path: "/home/setting",
        component: Setting,
        exact: true,
      },
      {
        path: "/home/post/:idPost",
        component: Post,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
  {
    path: "/",
    component: LayoutStart,
    exact: false,
    routes: [
      {
        path: "/",
        component: Login,
        exact: true,
      },
      {
        path: "/register",
        component: Register,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
];

export default routes;
