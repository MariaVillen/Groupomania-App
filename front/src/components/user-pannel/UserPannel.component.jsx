
import classes from "./UserPannel.module.scss";
import { useOutletContext } from "react-router-dom";
import UserCard from "../userCard/UserCard.component";

function UserPannel() {

  const [users] = useOutletContext();

  return (
    <div>
      <h2>List of users</h2>
      <ul className={classes.friendList}>
        {users?.length > 0 ? (
          users.map((u) => {
            return (
              <li key={u.id} className={classes.activeCard}>
                <UserCard userInCard = {u}/>
              </li>
            );
          })
        ) : (
          <p> Not users founded </p>
        )}
      </ul>
    </div>
  );
}
export default UserPannel;
