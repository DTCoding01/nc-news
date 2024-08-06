export function addOptimisticComment(comments, newComment) {
  return [newComment, ...comments];
}

export function replaceOptimisticComment(
  comments,
  tempCommentId,
  serverComment
) {
  return comments.map((comment) =>
    comment.comment_id === tempCommentId ? serverComment : comment
  );
}

export function removeOptimisticComment(comments, tempCommentId) {
  return comments.filter((comment) => comment.comment_id !== tempCommentId);
}
