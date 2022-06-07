import classes from './Rightbar.module.scss';
import Feed from '../feed/Feed.component';


// Rightbar of home 

export default function Rightbar({className, isLoadPosts, loadPosts}) {
  return (
    <div className={`${classes.container} ${className}`}>
      <h2 className={classes.title}>Les plus commentées!</h2>
      <Feed isLoadPosts={isLoadPosts} loadPosts={loadPosts} topComments={true}/>
    </div>
  )
}
