import classes from "./ProfileCard.module.scss";
import {Link} from "react-router-dom";
import DefaultAvatar from "../../images/avatar-default.png";
export default function ProfileCard({user, size}) {
  
  const sizeCard = size || "small";

  
  const onerrorLoad = (e) => {
    e.target.src = DefaultAvatar;
    e.target.onError = false;
  }

  return (
    <div className={classes[sizeCard]}>
      <div className={classes.header}>
        <div className={classes.container_cover}>
          <div className={classes.innerCover}>
          { user?.coverPicture ? <img
            className={classes.coverImage}
            src={user.coverPicture}
            alt={user.name}
          /> : <></>}
          </div>
        </div>
        <Link to={`profile/${user.id}`}>    
        <div className={classes.container_avatar}>
            {user.profilePicture ? 
          <img
            className={classes.userImage}
            onError = {onerrorLoad}
            src={user.profilePicture}
            alt={user.name}
          /> : <img
          className={classes.userImage}
          src={DefaultAvatar}
          alt={user.name}
        />}
        </div>
        </Link>     
      </div>
      <div className={classes.info}>
        <h4 className={classes.name}>{user.name} {user.lastName}</h4>
        <span className={classes.description}>{user.bio? user.bio : "Salut mes amis!"}</span>
      </div>
    </div>
  );
}
