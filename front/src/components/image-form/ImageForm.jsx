import classes from "./ImageForm.module.scss";
import { Photo, Check, Clear } from "@mui/icons-material";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { ROLES } from "../../helpers/rolesList";

// Form to change avatar and cover images in profile

export default function ImageForm({ imageName, className, labelDesc }) {
  const axios = useAxiosPrivate();
  const { auth, user, setUser } = useAuth();


    
  // EDITION
  
  // Edit state
  const [onEdit, setOnEdit] = useState(false);

  // Allow Edition
    const allowEdition = user.id === auth.user.id || auth.user.role === ROLES.admin;
    const allowEditionHandler = (e) => {
      if ( allowEdition ){
      setOnEdit( true );
    }
  };

  // Cancel Edition
  const cancelHandler = () => {
    setOnEdit( false );
  };

  // SUBMIT image to DB
  const submitHandler = async ( event ) => {
    event.preventDefault();

    const idUser = user.id;
    const putRoute = "/user/" + idUser;
    const fd = new FormData();

    if ( imageName === "cover" && event.target.cover?.files[0] ) {
        fd.append( "cover", event.target.cover.files[0] );
    } else if ( imageName === "avatar" && event.target.avatar?.files[0] ) {
        fd.append( "avatar", event.target.avatar.files[0] );
    } else {
        console.log( "Pas de d'image" );
        return;
    }
    try {
      const response = await axios.put( putRoute, fd )
      if ( !response ) {
        console.log("No answer");
        return;
      } else {
        if ( imageName ==="cover" ) {
          setUser({ ...user, coverPicture: response.data.message.coverPicture })
        } 
        if (imageName ==="avatar"){
          setUser({ ...user, profilePicture: response.data.message.profilePicture });
        }
        setOnEdit( false );
         console.log( "Modifié!" );
      }

    } catch ( err ) {
      console.log( err );
    }
  };


  return (
       <form onSubmit={ submitHandler } className = {`${ classes.imageForm } ${ className }`}>
          <div onClick={ allowEditionHandler } className={ classes.imageForm_container }>
            <label htmlFor={ imageName } className={ classes.imageForm_item }>
              <Photo aria-label={ `Image du ${ imageName }`} className={ classes.imageForm_icon } />
              <span>
                { labelDesc }
              </span>
            </label>
            { onEdit
                ? <input
                    accept="image/*"
                    id={ imageName }
                    name={ imageName }
                    type="file"
                  /> 
                : null
            }

          </div>

          { onEdit 
            ? (< div className={ classes.imageForm_btn_section}>
                <Clear area-label="Annuler" onClick={ cancelHandler } className={ classes.imageForm_btn }/>
                <button className = { classes.imageForm_btn_container } area-label="Envoyer" type="submit">
                  < Check className={ classes.imageForm_btn } />
                </button>
              </div>) 
            : null}
    </form>)
}
