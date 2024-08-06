import { useContext, useEffect, useState } from "react";
import { getCommentsByArticleId, postComment } from "../../../api.js";
import CommentCard from "./CommentCard";
import "../../css/components/CommentsList.scss";
import { UserContext } from "../../contexts/UserContext";
import {
  addOptimisticComment,
  replaceOptimisticComment,
  removeOptimisticComment,
} from "../../utils/comments.js";
import { useError } from "../../contexts/ErrorContext";

export default function CommentList({ articleId }) {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState("");
  const { setError } = useError();

  useEffect(() => {
    if (articleId) {
      getCommentsByArticleId(articleId)
        .then((comments) => {
          setComments(comments);
        })
        .catch((error) => {
          setError("Error fetching comments");

        });
    }
  }, [articleId, setError]);

  function handleChange(e) {
    setCommentBody(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      setError("User not logged in");
      return;
    }

    if (commentBody.trim().length > 0) {
      const tempCommentId = Date.now();
      const newComment = {
        username: user.username,
        body: commentBody,
        comment_id: tempCommentId,
        created_at: new Date().toISOString(),
      };

      setComments((prevComments) =>
        addOptimisticComment(prevComments, newComment)
      );
      setCommentBody("");

      postComment(articleId, newComment)
        .then((serverComment) => {
          setComments((prevComments) =>
            replaceOptimisticComment(prevComments, tempCommentId, serverComment)
          );
        })
        .catch((err) => {
          setError("Error posting comment");
          setComments((prevComments) =>
            removeOptimisticComment(prevComments, tempCommentId)
          );
        });
    } else {
      setError("Comment cannot be empty");
    }
  }

  return (
    <section className="comments-list">
      <p className="comments-header">Comments | {comments.length}</p>
      <form onSubmit={handleSubmit} className="comment-form">
        <label htmlFor="comment-input">
          <input
            onChange={handleChange}
            value={commentBody}
            type="text"
            id="comment-input"
            placeholder="Write a comment..."
          />
        </label>
        <button type="submit" id="submit-comment">
          Post
        </button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li className="article-list-item" key={comment.comment_id}>
            <CommentCard comment={comment} setComments={setComments} />
          </li>
        ))}
      </ul>
    </section>
  );
}
