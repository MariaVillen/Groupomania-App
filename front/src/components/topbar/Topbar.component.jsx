import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Topbar.module.scss";
import Logo from "../../images/logos/icon-left-fontre.png";
import useAuth from "../../hooks/useAuth";
import DefaultAvatar from "../../images/avatar-default.png";
import useLogout from "../../hooks/useLogout";

// Menu TopBar General navigation bar.

export default function Topbar({rolesList}) {
  // Authorization
  const { auth, user } = useAuth();
  const userRole = auth.user.roles;
  const logout = useLogout();

  // Submenu handler
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);

  // Navigation
  const navigate = useNavigate();

  // Unlog Handler
  const unLogHandler = async () => {

    await logout();
    navigate("/login");
  };

  // Event to control the responsive menu.

  const subMenuHandler = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };


  return (
    <div className={classes.topbar}>

      <div className={classes.topbar_logo}>
        <img src={Logo} alt="Groupomania Logo" />
      </div>

      <nav className={classes.topbar_menu}>

        <div
          onClick={subMenuHandler}
          className={`${classes.topbar_avatar} ${
            isSubMenuOpen && classes.show
          }`}
        >
          {(user.profilePicture)
            ?<img src={user.profilePicture || DefaultAvatar} alt="Profile" />
            : <img src={DefaultAvatar} alt="Profile"/>}
        </div>

        <ul onClick={subMenuHandler} className={classes.topbar_links}>
    
          <li className={classes.topbar_item}>
            <Link className={classes.topbar_link} to="/">
              Accueil
            </Link>
          </li>

          <li className={classes.topbar_item}>
            <Link className={classes.topbar_link} to={`/profile/${auth.user.id}`}>
              Profile
            </Link>
          </li>

          {(userRole === rolesList.admin) && (
            <li className={classes.topbar_item}>
              <Link className={classes.topbar_link} to="/admin">
                Administration
              </Link>
            </li>
          )}

          <li
            className={`${classes.topbar_item} ${classes.notLink}`}
            onClick={unLogHandler}
          >
            Déconnexion
          </li>

        </ul>

      </nav>
      
    </div>
  );
}
