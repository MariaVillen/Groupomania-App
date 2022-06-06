import classes from "./Sidebar.module.scss";
import Avatar from "../avatar/avatar.component";
import ProfileCard from "../profile-card/ProfileCard";
import ProfileForm from "../profile-form/ProfileForm.component";
import useAuth from "../../hooks/useAuth";

// Sidebar of the home page.

export default function Sidebar({className, users}) {

  const {user} = useAuth();

  return (
    <div className={`${classes.container} ${className}`}>

      <ProfileCard
        user={user}
      />
      <div className={classes.wrapper}>
        <ProfileForm userProfile = {user}/>
        <hr className={classes.separator} />
        <p className={classes.title}>Utilisateurs</p>
        {(users?.length)
          ? <ul className={classes.friendList}>
            {users.map((u) => {
              return (
                <li key={u.id}>
                  <Avatar
                    userName={u.name} 
                    userImage= { u.profilePicture }
                    userId= { u.id }
                  />
                </li>
              );}
            )}
            </ul>
          : <p>Pas d'utilisateurs.</p>
        }
  
      </div>
    </div>
  );
}
