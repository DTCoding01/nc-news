import { useContext } from "react";
import timeAgo from "../../utils/articles";
import { UserContext } from "../../contexts/UserContext";
import { deleteComment } from "../../../api";
import { useError } from "../../contexts/ErrorContext";
import "../../css/components/CommentCard.scss";
export default function CommentCard({ comment, setComments }) {
  const { user } = useContext(UserContext);
  const { setError } = useError();

  function handleClick(e) {
    e.preventDefault();
    setComments((prevComments) =>
      prevComments.filter(
        (currComment) => currComment.comment_id !== comment.comment_id
      )
    );
    deleteComment(comment.comment_id).catch((err) => {
      setError("Error deleting comment");
      setComments((prevComments) => [...prevComments, comment]);
    });
  }

  return (
    <section className="comment">
      <div className="comment-details">
        <p className="comment-author">{comment.author} | {timeAgo(comment.created_at)}</p>
      </div>

      <p className="comment-body">{comment.body}</p>
      <div className="votes-container">
        <p className="comment-votes">{comment.votes}</p>
        <button className="upvote">+</button>
        <button className="downvote">-</button>
        {user
          ? comment.author === user.username && (
              <button onClick={handleClick} className="delete-comment">
                X
              </button>
            )
          : null}
      </div>
    </section>
  );
}
