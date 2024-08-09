import { useContext, useState, useEffect } from "react";
import timeAgo from "../../utils/articles";
import { UserContext } from "../../contexts/UserContext";
import { deleteComment, patchCommentVotes } from "../../../api";
import { useError } from "../../contexts/ErrorContext";
import "../../css/components/CommentCard.scss";
import {
  getCommentVoteFromStorage,
  removeCommentVoteFromStorage,
  saveCommentVoteToStorage,
} from "../../utils/localStorage";

export default function CommentCard({ comment, setComments }) {
  const { user } = useContext(UserContext);
  const { setError } = useError();
  const [userVote, setUserVote] = useState(() =>
    getCommentVoteFromStorage(comment.comment_id)
  );
  const [currentVotes, setCurrentVotes] = useState(comment.votes);
  useEffect(() => {
    setCurrentVotes(comment.votes);
  }, [comment.votes]);

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

  function handleVote(e) {
    const voteType = e.target.className.includes("upvote") ? 1 : -1;
    let voteAmount = 0;

    if (userVote === voteType) {
      voteAmount -= voteType;
      setUserVote(0);
      removeCommentVoteFromStorage(comment.comment_id);
    } else {
      voteAmount = voteType - userVote;
      setUserVote(voteType);
      saveCommentVoteToStorage(comment.comment_id, voteType);
    }

    setCurrentVotes((prevVotes) => prevVotes + voteAmount);

    const vote = {
      inc_votes: voteAmount,
    };

    patchCommentVotes(comment.comment_id, vote).catch((error) => {
      console.error("Error updating votes:", error);
      setCurrentVotes((prevVotes) => prevVotes - voteAmount);
      setUserVote(userVote);

      if (userVote !== 0) {
        saveCommentVoteToStorage(comment.comment_id, userVote);
      } else {
        removeCommentVoteFromStorage(comment.comment_id);
      }
    });
  }

  return (
    <section className="comment">
      <div className="comment-details">
        <p className="comment-author">
          {comment.author} | {timeAgo(comment.created_at)}
        </p>
      </div>

      <p className="comment-body">{comment.body}</p>
      <div className="votes-container">
        <p className="comment-votes">{currentVotes}</p>
        <button
          onClick={handleVote}
          className={`upvote ${userVote === 1 ? "clicked" : null}`}
        >
          +
        </button>
        <button
          onClick={handleVote}
          className={`downvote ${userVote === -1 ? "clicked" : null}`}
        >
          -
        </button>
        {user && comment.author === user.username && (
          <button onClick={handleClick} className="delete-comment">
            X
          </button>
        )}
      </div>
    </section>
  );
}
