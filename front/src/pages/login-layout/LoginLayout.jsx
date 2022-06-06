import { Outlet } from "react-router-dom";

import classes from "./LoginLayout.module.scss";
import Logo from "../../images/logos/icon-left-fontre.png";


// Login page presentation. Access to login or register.

export default function Login(props) {

  return (
    <div className={classes.login}>
      <div className={classes.login_wrapper}>
        <div className={classes.login_title}>
          <div className={classes.login_title_logo}>
            <img src={Logo} alt="Groupomania, reséau social d'enterprise" />
          </div>
          <span className={classes.login_title_description}>
            Commencez à partager avec vos collègues!
          </span>
        </div>
        <div className={classes.login_body}>
          <div className={classes.login_body_form}>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
}
