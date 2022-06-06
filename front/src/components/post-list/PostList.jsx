import Share from "../share/Share.component";
import Feed from "../feed/Feed.component";
import { useOutletContext } from "react-router-dom";

export default function PostList() {

    const [isLoadPosts, loadPosts] = useOutletContext();

  return (
    <>
      <Share isLoadPosts={isLoadPosts} loadPosts={loadPosts} />
      <Feed loadPosts={loadPosts} isLoadPosts={isLoadPosts} />
    </>
  );
}
