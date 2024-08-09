import { followUser, unfollowUser } from "../../api";

export function handleFollowUser(currUser, followeeUsername) {
  return followUser(currUser, followeeUsername);
}

export function handleUnfollowUser(currUser, username) {
  return unfollowUser(currUser, username);
}
