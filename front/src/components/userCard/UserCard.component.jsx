
import classes from "./UserCard.module.scss";
import { useRef, useState } from "react";
import Avatar from "../avatar/avatar.component";
import  useAxiosPrivate  from "../../hooks/useAxiosPrivate";


export default function UserCard({userInCard}) {

  const axios = useAxiosPrivate();
  const activeRef = useRef();
  const [active, setActive] = useState(userInCard.isActive);

  const userActivationHandler = async ()=>{
    const idUser = userInCard.id;
    setActive(!active);
    const option = active? 0 : 1;
    try {
      const response = await axios.put(`/user/${idUser}`, { isActive: option });
      if (!response) {
         console.log("No answer");
         return;
      } 
      console.log("Modifié!");

      } catch (err) {
       console.log(err);
       }
  }

  return (
    <>
        <div className={classes.activeCard_header}>
                  <div className={classes.activeCard_user}>
                    <Avatar
                      userName={userInCard.name}
                      userImage={userInCard.profilePicture}
                      userId={userInCard.id}
                    />
                    <div className={classes.activeCard_user_name}>
                      <span>{userInCard.name}</span>
                      <span>{userInCard.lastName}</span>
                    </div>
                  </div>
                </div>
                <div className={classes.activeCard_body}>
                  <div className={classes.activeCard_data}>
                    <div className={classes.activeCard_data_email}>
                      <span>Email:</span>
                      {userInCard.email}
                    </div>
                    <div className={classes.activeCard_data_register}>
                      <span>Inscription:</span>
                      {userInCard.createdAt}
                    </div>
                  </div>
                  <div className={classes.activeCard_action}>
                    <button
                      ref = {activeRef}
                      onClick={userActivationHandler}
                      className={active? classes.activeCard_action_check_active : classes.activeCard_action_check_inactive}
                      id={`userActive${userInCard.id}`}
                      type="button"
                      value={active}
                     >{active ? "Desactiver" : "Activer"}</button>
                  </div>
                </div>
    </>
    );
   
}
