import classes from "./TextareaForm.module.scss";
import { AutoStories, Check, Clear } from "@mui/icons-material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import TextareaRezise from "../textarea-rezise/TextareaResize.component";
import { useState, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import { ROLES } from "../../helpers/rolesList";

export default function TextareaForm({classNamez}) {
  const axios = useAxiosPrivate();
  const { auth, user, setUser } = useAuth();
 

    
  // EDIT textarea
  const allowEdition =
  user.id === auth.user.id || auth.user.role === ROLES.admin;
  const [content, setContent] = useState(user.bio || "Salut mes amis!");
  const contentRef = useRef();
  const [onEdit, setOnEdit] = useState(false);

  // Allow Edition
  const allowEditionHandler = () => {
    if (allowEdition){
    setOnEdit(true);
    contentRef.current.focus();
    }
  };

  // Cancel Edition
  const cancelHandler = () => {
    setOnEdit(false);
    setContent(user.bio || "Salut mes amis!");
    contentRef.current.style.height = "inherit";
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const idUser = user.id;
    const putRoute = "/user/" + idUser;
    try {
      const response = await axios.put(putRoute, { bio: content });
      if (!response) {
        console.log("No answer");
        return;
      }
      console.log("Modifié!");
      setUser({...user, bio: content});
      setOnEdit(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form className={classes.textareaForm}>
      <div className={classes.textareaForm_container}>
        <div  onClick={allowEditionHandler} className={classes.textareaForm_item}>
          <label htmlFor="bio">
            <AutoStories className={classes.textareaForm_item_icon} />
            <span className={classes.textareaForm_item_labelText}>
              Biographie:
            </span>
          </label>
          <div className={classes.textareaForm_action}>
            <TextareaRezise
              name="bio"
              id="bio"
              innerRef={contentRef}
              rows="1"
              onChange={(e) => setContent(e.target.value)}
              className={onEdit? classes.textareaForm_edit : classes.textareaForm_noedit}
              text={content}
              readOnly={!onEdit}
            />
        </div>
      </div>
      {onEdit ? (
        <div className={classes.btn_section}>
          <Clear onClick={cancelHandler} className={classes.btn_cancel}/>
           <Check onClick={submitHandler} className={classes.btn_submit} />
        </div>
      ) : null}
      </div>
    </form>
  );
}
