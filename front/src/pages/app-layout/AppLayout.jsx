import classes from "./AppLayout.module.scss";
import Topbar from "../../components/topbar/Topbar.component";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import SpinnerLoad from "../../components/spinner-load/SpinnerLoad";

function AppLayout({ rolesList }) {
  
  // Api
  const axiosPrivate = useAxiosPrivate();
  const { auth, user, setUser } = useAuth();

  // User load
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState();

  // Load User from database

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/user", {
          signal: controller.signal,
        });
        const usersLoaded = response.data;

        if (isMounted) {
          // Stock data
          const loggedUserIndex = usersLoaded.findIndex(
            (u) => auth.user.id === u.id
          );
          setUser(usersLoaded[loggedUserIndex]);
          // Erase logged user from users list
          usersLoaded.splice(loggedUserIndex, 1);
          setUsers(usersLoaded);
          setIsLoading(false);
        }
      } catch (err) {
        //console.log(`"ERROR": ${err.message}`);
      }
    };

    getUsers();
    // if unmounted component
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className={classes.container}>
      {isLoading ? (
        <SpinnerLoad className={classes.spinner}/>
      ) : (
        <>
          <div className={classes.navigation}>
            <Topbar rolesList={rolesList} />
          </div>

          <main className={classes.main}>
            <Outlet context={[users, user]} />
          </main>
        </>
      )}
    </div>
  );
}

export default AppLayout;
