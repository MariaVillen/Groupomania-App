import classes from "./ProfileForm.module.scss";
import { useState } from "react";
import { NoAccounts } from "@mui/icons-material";
import TextareaForm from "../textarea-form/TextareaForm.component";
import ImageForm from "../image-form/ImageForm";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import Portal from "../portal/Portal";
import Modal from "../modal/Modal";

export default function ProfileForm( {userProfile}) {

  const axios = useAxiosPrivate();
  const navigate = useNavigate();

  const [onModal, setOnModal] = useState(false);


  const deleteHandler = (e) => {
      axios.delete(`/user/${userProfile.id}`)
      .then( ( result ) => {
        if (result) {
          console.log("Utilisateur supprimé");
          navigate("/login", { repalce: true });
        } else {
          console.log("suppresion annulée");
        }
      })
      .catch((err)=>{
      console.log("Erreur en supprimir compte ", err);
      })
      setOnModal(false);
    }

  const deleteAccountHandler = (e)=> {
    e.preventDefault();
    // eslint-disable-next-line no-unused-expressions
    setOnModal(true);
  }

  return (
    <div>
      <div className={classes.profileForm}>
        <div className={classes.sidebarList}>
          <TextareaForm className={classes.profileForm_edit}/>
          <ImageForm
            className={classes.profileForm_imageEdit}
            imageName="cover"
            labelDesc="Modifier l'en tête."
          />
          <ImageForm
            className={classes.profileForm_imageEdit}
            imageName="avatar"
            labelDesc="Modifier l'avatar."
          />
        </div>
      </div>

      <button onClick={deleteAccountHandler} className={`${classes.linkList} ${classes.linkList_danger}`}>
        <NoAccounts className={classes.sidebarIcon} />
        <span className={classes.sidebarListItemText}>Supprimer compte.</span>
      </button>
      {onModal 
        ?<Portal>
          <Modal actionConfirm = {deleteHandler} setOnModal = {setOnModal} message="Vous etes pour supprimer votre compte. Confirmer la suppresion de compte."></Modal>
        </Portal>
        : null
      }
    </div>
  );
}
