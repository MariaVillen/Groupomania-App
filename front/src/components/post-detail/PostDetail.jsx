import classes from "./PostDetail.module.scss";
import Post from "../post/Post.component";
import PostAddComment from "../post-add-comment/PostAddComment.component";
import FeedComments from "../feed-comments/FeedComents.component";
import { useOutletContext, useParams } from 'react-router-dom';
import { useEffect, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SpinnerLoad from "../spinner-load/SpinnerLoad";

function PostDetail() {
  
  const {id} = useParams();
  const [post, setPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadPosts, loadPosts ] = useOutletContext();
 
  const [totalComments, setTotalComments] = useState(0);
  const [loadComments, setLoadComments] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(  () => {
    let isMounted = true;
    const controller = new AbortController();

    const getPostsById = async ()=> {
      try {
        const response = await axiosPrivate.get(`/post/${id}`, {signal: controller.signal})
        const data = response.data;
    
        if (isMounted) {
          // Stock data
          setPost(data);
          setTotalComments(data.totalComments);
          isLoadPosts(!loadPosts);
          setIsLoading(false);
        } 
      } catch(err) {
        console.log(err.message);
      }
    }

    getPostsById();

    // if unmounted component
    return ()=> {
      isMounted=false;
      controller.abort();
    }
  }, [loadComments]);

  
  return (

    <>
      { isLoading 
        ? <SpinnerLoad/>
        :  <>
          <Post
            key={post.id}
            post={post}
            totalComments={totalComments}
            detail={true}
          /> 
          <div className={classes.commentContent}>
            <PostAddComment  totalComments = {totalComments} loadComments = {loadComments}
              setLoadComments = {setLoadComments} setTotalComments = {setTotalComments} postId={post.id} />
            <FeedComments 
              loadComments = {loadComments}
              setLoadComments = {setLoadComments} 
              setTotalComments = {setTotalComments}
              totalComments = {totalComments}
              onlyForPostId={post.id} />
          </div>
          </>
      }
    </>
  )   
}

export default PostDetail



