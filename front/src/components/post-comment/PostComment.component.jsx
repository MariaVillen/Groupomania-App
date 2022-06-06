import classes from "./PostComment.module.scss";
import TextareaRezise from "../textarea-rezise/TextareaResize.component";
import Portal from "../portal/Portal";
import CreateReport from "../create-report/CreateReport";
import { useState, useRef, useEffect } from "react";
import {
  MoreHoriz,
  Favorite,
  FavoriteBorderOutlined,
  CheckCircle,
  Cancel
} from "@mui/icons-material";
import Avatar from "../avatar/avatar.component";
import useAuth from "../../hooks/useAuth";
import { axiosPrivate } from "../../api/axios";
import DefaultAvatar from "../../images/avatar-default.png";


export default function PostComment({className, setTotalComments, totalComments, loadComments, setLoadComments, comment})  {


  const {auth} = useAuth();


  // id comment DOM
  const id = `comment${comment.id}${comment.postId}`;

  // Like Handler
  const [like, setLike] = useState(comment.likes);
  const [isLiked, setIsLiked] = useState(false);
  
  const likeHandler = async (e) => {
   
    try{
    const result = await axiosPrivate.post(`/comment/${comment.id}/like`, {
      userId: auth.user.id
    }).then(
      ()=> {
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);    
      }
    )
  } catch(err){
    console.log(err);
  }
}

  // Delete Handler
  const deleteHandler = ()=>{
    axiosPrivate.delete(`/comment/${comment.id}`, {
      where: {
        id: comment.id
      }
    })
    .then(()=>{
      setOnEdit(false);
      setIsMenuActive(false);
      setTotalComments(totalComments - 1);
      setLoadComments(!loadComments);
    })
    .catch((err)=>{console.log(err)})
  }
  

  // EDIT 
  const [textComment, setTextComment] = useState(comment.content);
  const contentRef = useRef();
  const [onEdit, setOnEdit] = useState(false);
  
  // Allow Edition
  const allowEditionHandler = ()=>{
    setOnEdit(true);
    setIsMenuActive(false);
    contentRef.current.focus();
  }

  // Cancel Edition
  const cancelHandler = ()=>{
    setOnEdit(false);
    setTextComment(comment.content);
    setIsMenuActive(false);
    contentRef.current.style.height = "inherit";
  }

  //REPORT
 const [onReport, setOnReport] = useState(false);


  // SubMenu Handler
  const [isMenuActive, setIsMenuActive] = useState(false);
  const menuViewHandler = () => {
    setIsMenuActive(!isMenuActive);
  };

  // Submit Handler
  const submitHandler = (event) => {
    event.preventDefault();
    axiosPrivate.put(`/comment/${comment.id}`,{content: textComment},{
      where: {
        id: comment.id
      }
    }).then(
      ()=>{
        setOnEdit(false);
        setTextComment(textComment);
        setIsMenuActive(false);
        setLoadComments(!loadComments);
        contentRef.current.style.height = "inherit";
      }
    )
    
  };
  

  // Get if a message was like for me
  
useEffect(  () => {

  let isMounted = true;
  const controller = new AbortController();

  const getLike = async ()=> {
    try {
      const response = await axiosPrivate.get(`/comment/${comment.id}/like`, {signal: controller.signal});
      const onLike = response.data;

      if (isMounted) {
        // Stock data
        if (onLike) {
          setIsLiked(onLike.message);
        }
    
      }
    }  catch(err) {
       //console.log("ERROR: ", err.message);
    }
  }

  getLike();

  // if unmounted component
  return ()=> {
    isMounted=false;
    controller.abort();
  }
}, []);

  return (
    <>
      <div id= {id} className={classes.wrapper}>
        <div className={classes.central}>
          <div className={classes.central_container}>
            <div className={classes.avatar}>
              <Avatar userName = {comment.user?.name || "Invité"} userImage={comment.user?.profilePicture || DefaultAvatar } userId = {comment.user?.id || comment.userId}/> 
            </div>

            <div className={classes.body}>
              <span>{comment.user?.name || "Invité"}</span>
              <TextareaRezise
                name="textComment"
                innerRef={contentRef}
                className={classes.edit}
                onChange={(e)=>setTextComment(e.target.value)}
                text= {textComment}
                readOnly = {!onEdit}
              />
            </div>
            <div className={classes.menu}>
              <MoreHoriz
                onClick={menuViewHandler}
                className={classes.comment_menu_icon}
              />

              {isMenuActive ? (
                <ul className={classes.dropdown}>
                  {auth.user.id === comment.userId 
                  ? <><li onClick={allowEditionHandler}>Editer</li>
                    <li onClick={deleteHandler}>Supprimer</li></> 
                  : null}

                 {auth.user.id !== comment.userId 
                    ? <li onClick={()=>{setOnReport(true)}}>Signaler</li>
                    : null }
                </ul>
              ) : null}
            </div>
          </div>
        </div>
        <div className={classes.footer}>
          <div className={classes.likes}>
            <button className={classes.favorite} onClick={likeHandler}>
              {isLiked ? (
                <Favorite className={classes.favorite_icon} />
              ) : (
                <FavoriteBorderOutlined
                  className={classes.comment_favorite_icon}
                />
              )}
            </button>

            <span className={classes.counter}>{like}</span>

            <span>{comment.createdAt}</span>
          </div>
          {onEdit 
            ? <div> 
              <CheckCircle onClick={submitHandler}/>
              <Cancel onClick={cancelHandler}/>
              </div>
            : null
          } 
        </div>
      </div>
      {onReport
        ? <Portal>
          <CreateReport messageId = {comment.id} typeMessage="comment" setOnReport={setOnReport}/> 
          </Portal>
        :null}
    </>
  );
}
