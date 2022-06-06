import classes from "./Admin.module.scss";
import {AccountCircle, FlagCircle } from "@mui/icons-material";
import { Outlet, useOutletContext, Link } from "react-router-dom";

export default function Admin() {

  const [users] = useOutletContext();

  return (
    <>
      <main className = {classes.container}>
          <nav className = {classes.navbar}>
            <ul>
              <li>
                <Link className={classes.navbar_link} to="/admin">
                  <AccountCircle className={classes.navbar_link_icon}/> Users
                </Link>
              </li>
              <li>
                <Link className={classes.navbar_link} to="/admin/reports">
                  <FlagCircle className={classes.navbar_link_icon}/> Reports
                </Link>
              </li>
            </ul>
          </nav>
          <div className={classes.wrapper}>
          <h1> Panneau d'administration</h1>
          <Outlet context={[users]} />
        </div>
      </main>
    </>
  );
}
