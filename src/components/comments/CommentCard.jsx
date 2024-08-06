import timeAgo from "../../utils/articles";

export default function CommentCard({ comment }) {
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
      </div>
   
    </section>
  );
}
