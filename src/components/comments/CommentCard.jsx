import { useContext } from "react";
import timeAgo from "../../utils/articles";
import { UserContext } from "../../contexts/UserContext";
import { deleteComment } from "../../../api";

export default function CommentCard({ comment, setComments }) {
  const { user } = useContext(UserContext);

  function handleClick(e) {
    e.preventDefault();
    setComments((prevComments) =>
      prevComments.filter(
        (currComment) => currComment.comment_id !== comment.comment_id
      )
    );
    deleteComment(comment.comment_id).catch((err) => {
      console.log("Error deleting comment:", err)
      setComments(prevComments => [...prevComments, comment])
    })
  }

  return (
    <section className="comment">
      <div>
        <p className="comment-author">{comment.author} |</p>
        <p className="comment-posted">{timeAgo(comment.created_at)}</p>
      </div>

      <p className="comment-body">{comment.body}</p>
      <div className="votes-container">
        <p className="comment-votes">{comment.votes}</p>
        <button className="upvote">+</button>
        <button className="downvote">-</button>
        {comment.author === user.username && (
          <button onClick={handleClick} className="delete-comment">
            X
          </button>
        )}
      </div>
    </section>
  );
}
