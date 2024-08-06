import { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../../../api";
import CommentCard from "./CommentCard";
import '../../css/components/CommentsList.scss'

export default function CommentList({ articleId }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (articleId) {
      getCommentsByArticleId(articleId)
        .then((comments) => {
          setComments(comments);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    }
  }, [articleId]);

  return (
    <section className="comments-list">
      <p className="comments-header">Comments | {comments.length}</p>
      <ul>
        {comments.map((comment) => {
          return (
            <li className="article-list-item" key={comment.comment_id}>
              <CommentCard comment={comment} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
