import classes from "./Home.module.scss";
import Sidebar from "../../components/sidebar/Sidebar.component";
import Rightbar from "../../components/rightbar/Rightbar.component";
import useMediaQuery from "../../hooks/useMediaQuery";
import {useState } from "react";
import {Outlet, useOutletContext } from "react-router-dom";


// Home Page

export default function Home() {
  
  const tablet = useMediaQuery("(min-width: 768px)");
  const pc = useMediaQuery("(min-width: 1200px)");

  const [users, user] = useOutletContext();

  const [ loadPosts, isLoadPosts] = useState(true);

  return (
    <div className={classes.home_container}>
      {tablet ? <Sidebar className={classes.home_sidebar} user = {user} users={users} /> : <></>}
      <div className={classes.home_feed_content}>
        <Outlet context = {[isLoadPosts, loadPosts, user, users]} />
      </div>
      {pc ? (
        <Rightbar className={classes.home_more_comment_content} />
      ) : (
        <></>
      )}
    </div>
  );
}
