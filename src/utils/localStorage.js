import { useSyncExternalStore } from "react";

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

export function saveUserToStorage(user) {
  try {
    const userStr = JSON.stringify(user); 
    localStorage.setItem('user', userStr); 
  } catch (error) {
    console.error("Error saving user to storage", error);
  }
}

export function getUserFromStorage() {
  try {
    const storedUser = localStorage.getItem('user'); 
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) { 
    return null; 
  }
}