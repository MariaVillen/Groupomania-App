import classes from "./Profile.module.scss";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { PersonRemove } from "@mui/icons-material";
import Feed from "../../components/feed/Feed.component";
import ProfileCard from "../../components/profile-card/ProfileCard";
import ProfileForm from "../../components/profile-form/ProfileForm.component";
import Avatar from "../../components/avatar/avatar.component";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SpinnerLoad from "../../components/spinner-load/SpinnerLoad";
import { useNavigate } from "react-router-dom";

// Profile Page

export default function Profile() {

  const { auth, user } = useAuth();
  const params = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();


  // Determinate Profile Person
  const profileId = parseInt(params.id);
  const [userProfile, setUserProfile] = useState({});
  const [notMyProfile, setNotMyProfile] = useState(auth.user.id !== profileId);

  // List of followed users.
  const [usersFollowed, setUsersFollowed] = useState({});
  const [onChangeFollow, setOnChangeFollow] = useState(false);
  const [followedByMe, setFollowedByMe ] = useState(false);
  const followerRef = useRef();
  
  const changeFollow = (userToFollow) => {

    axiosPrivate
    .post(`/user/${userToFollow}/follows`, {
      followingId: auth.user.id,
      followedId: userToFollow,
    })
    .then((result) => {
      setFollowedByMe(!followedByMe);
      setOnChangeFollow(!onChangeFollow);
    })
    .catch((err) => {
      console.log(err);
    });

  }
  // Follow handler  
  const addfollowHandler = () => {
    changeFollow(userProfile.id);
  }

  // Follow card Handler 
  const removeFollowedHandler = (e) => {
    changeFollow(followerRef.current.id);
  }

  // Follow Load List

  useEffect(() => {

    let isMounted = true;
    const controller = new AbortController();

    const getFollowers = async () => {
    const followeds = await axiosPrivate.get(`/user/${auth.user.id}/follows`);
    setUsersFollowed(followeds.data);
    setFollowedByMe(followeds.data.filter( f => f.id === profileId).length > 0);
    }

    getFollowers();
    
     // if unmounted component
     return () => {
      isMounted = false;
      controller.abort();
    }

  }, [onChangeFollow, profileId])

  // FOLLOWERS and USERid
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {

        const response = await axiosPrivate.get(`/user/${profileId}`, {
          signal: controller.signal,
        })
        if (response.data) {
        const userLoaded = response.data;

        if (isMounted) {
          // Stock data
          setNotMyProfile(() => auth.user.id !== profileId);
          setUserProfile(userLoaded);
          setIsLoading(false);
        }
       } else {
        //console.log("not user ");
        navigate('/notfound', { replace: true }); 
       }
      } catch (err) {
        //console.log(`"ERROR": ${err.message}`);
      }
    };

    getUser();

    // if unmounted component
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [profileId, onChangeFollow, notMyProfile]);

  return (
    <>
      {isLoading ? (
        <SpinnerLoad />
      ) : (
        <>
          <div className={classes.header}>
            <ProfileCard user={notMyProfile? userProfile : user} size="large" />
          </div>
          <div className={classes.content}>
            {notMyProfile ? null : (
              <div className={classes.content_infoLoggedUser}>
                <h2>Informations Personnelles</h2>
                <ProfileForm userProfile={notMyProfile? userProfile : user} setUserProfile={setUserProfile} />
                <hr />
                <p className={classes.title}>Mes contacts</p>
                <ul className={classes.friendList}>
                  {usersFollowed.length > 0 && usersFollowed?.map((u) => {
                    return (
                      <li key={u.id}>
                        <Avatar
                          userId={u.id}
                          username={u.name}
                          userImage={u.profilePicture}
                          sizePicture="80px"
                        />
                        <div className={classes.friendList_name}>
                          <span>{u.name}</span>
                          <span>{u.lastName}</span>
                        </div>

                        <PersonRemove
                          ref = {followerRef}
                          id = {u.id}
                          onClick={removeFollowedHandler}
                          className={classes.icon}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            <div className={classes.content_main}>
              {notMyProfile ? (
                <button onClick={addfollowHandler} className={followedByMe ? classes.unfollow : classes.follow}>
                  {followedByMe ? "Pas Suivre" : "Suivre"}
                </button>
              ) : null}
              <div className={classes.content_feed}>
                <Feed
                  onlyForUserId={profileId}
                  loadPosts={params.id}
                  userProfile={userProfile}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
