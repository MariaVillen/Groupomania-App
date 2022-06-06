import classes from "./Share.module.scss";
import { useState, useEffect, useRef } from "react";
import { PermMedia } from "@mui/icons-material";
import PreviewImage from "./PreviewImage.component";
import TextareaRezise from "../textarea-rezise/TextareaResize.component";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Avatar from "../avatar/avatar.component";
import useAuth from "../../hooks/useAuth";

// Component to share and public text and one image.

export default function Share({
  elementId,
  photo,
  content,
  isOpen,
  isLoadPosts,
  loadPosts,
  userShared
}) {

  const {user} = useAuth();
  const userShare = userShared || user;
  const contentRef = useRef();
  const idInput = elementId? userShare.id : "createPost";
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    contentRef.current.focus();
  }, []);

  useEffect(() => {
    if (photo) {
      setUrlImageLoaded(photo);
    }
  }, [photo]);

  // Use State
  const [urlImageLoaded, setUrlImageLoaded] = useState(false); // if url exists will storage url file
  const [file, setFile] = useState(); //if file is charged it will storage the file to send
  const [isImageCharged, setIsImageCharged] = useState(""); //control input value image (for reset)
  const [text, setText] = useState(content|| null);

  // Event Handler for Preview Image
  const loadImagePreviewHandler = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setUrlImageLoaded(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setFile(e.target.files[0]);
    } else {
      setUrlImageLoaded(false);
    }
  };

  // Event Handler for delete image preview and reset input
  const imageDeleteHandler = () => {
    setUrlImageLoaded(false);
    setFile(false);
    setIsImageCharged("");
  };

  // Event Handler for submit form
  const submitHandler = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    if(file) {formData.append("image", file)};
    formData.append("userId", userShare.id);
    if(text) {formData.append("content", text)};

    if ((file || text) && userShare.id)  {


      try {

        // If we are editing
        let success;
        if (elementId){
          let POST_URL =  `/post/${elementId}`;
          success = await axiosPrivate.put(POST_URL, formData);
        } else { 
        // If we are creating
          success = await axiosPrivate.post("/post", formData);
        }

        if (success) {
          //cleaning form
          setUrlImageLoaded(false);
          setFile(false);
          setIsImageCharged("");
          setText("");     
          if (elementId) {
            isOpen(false);
          }
          isLoadPosts(!loadPosts);
          console.log("Publication crée");
        } else {
          console.log("Pas de publication crée");
        }
      } catch (err) {
        console.log("Erreur: ", err.message);
      }
    } else {
      console.log("Veuillez ajouter une image ou du texte");
    }
  };

  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler} encType="multipart/form-data">
        <div className={classes.wrapper}>
          <div className={classes.shareHeader}>
            <Avatar userImage={userShare.profilePicture} userName={userShare.name} userId={userShare.id} />

            <div className={classes.shareHeader_content}>
              <TextareaRezise
                innerRef={contentRef}
                name={userShare.id || "textComment"}
                onChange={(e) => setText(e.target.value)}
                placeHolder="À quoi penses-tu?"
                className={classes.shareHeader_content_edit}
                text={text}
              />
            </div>
          </div>

          {urlImageLoaded ? (
            <PreviewImage image={urlImageLoaded} onClose={imageDeleteHandler} />
          ) : null}

          <hr className={classes.separator} />

          <div className={classes.shareFooter}>
            <div className={classes.shareFooter_options}>
              <input
                onChange={loadImagePreviewHandler}
                accept="image/*"
                id={idInput}
                name="image"
                type="file"
                style={{ display: "none" }}
                value={isImageCharged}
              />

              <label className={classes.shareFooter_option} htmlFor={idInput}>
                <PermMedia
                  htmlColor="tomato"
                  className={classes.shareFooter_option_icon}
                />
                <span className={classes.shareFooter_option_text}>
                  Ajouter Image
                </span>
              </label>
              <div className={classes.share_action}>
                {content || photo ? (
                  <div className={classes.share_btn_cancel}>
                    <span onClick={() => isOpen(false)}>Annuler</span>
                  </div>
                ) : null}
                <button type="submit" className={classes.share_btn}>
                  Publier
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
