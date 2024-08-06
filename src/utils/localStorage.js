export function getUserVoteFromStorage(articleId) {
    const storedVote = localStorage.getItem(`vote_${articleId}`);
    return storedVote ? Number(storedVote) : 0;
  }
  
  export function saveUserVoteToStorage(articleId, voteType) {
    localStorage.setItem(`vote_${articleId}`, voteType);
  }
  
  export function removeUserVoteFromStorage(articleId) {
    localStorage.removeItem(`vote_${articleId}`);
  }