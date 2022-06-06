import Post from "../post/Post.component";
import classes from "./Feed.module.scss";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SpinnerLoad from "../spinner-load/SpinnerLoad";

// Feed a list of Post (all in general or all post from a user if onlyForUserId is true)

export default function Feed({onlyForUserId, loadPosts, isLoadPosts, className = "", topComments }) {

  // Api
  const axiosPrivate = useAxiosPrivate();
  
  // Load Post each time "loadPost" state changes and at the first render
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState();

  useEffect(  () => {

    let isMounted = true;
    const controller = new AbortController();

    let post_url;

    if ( onlyForUserId ) {
      post_url = "/post/user/" + onlyForUserId; 
    } else if ( topComments ) {
      post_url = "/post/topten"
    } else { 
      post_url = "/post";
    }

    const getPosts = async ()=> {
      try {
        const response = await axiosPrivate.get( post_url, {signal: controller.signal} )
        const posts = response.data;

        if ( isMounted ) {
          // Stock data
          setPosts( posts );
          setIsLoading( false );
        } 
      
      } catch( err ) {
        //console.log("Error at loading posts", err.message);
      }
    }

    getPosts();

    // if unmounted component
    return ()=> {
      isMounted=false;
      controller.abort();
    }
  }, [ loadPosts ]);


  return (
    <>
      { isLoading 
          ? <SpinnerLoad/>
          : posts && ( posts?.length > 0 )
              ? posts.map(
                ( p ) => {
                  return (
                  <Post
                    className={ className }
                    key={ p.id }
                    loadPosts = { loadPosts }
                    isLoadPosts = { isLoadPosts }
                    post={ p }
                    totalComments={p.totalComments}
                  />
               )})
              : <p className={ classes.notFound }>Pas de publications trouvées.</p>
      }           
    </>
  );
}
