

import { getTopics, fetchFollowings, followTopic, unfollowTopic } from "../../api";

export function fetchAndSortTopics() {
  return getTopics().then((topics) => {
    return topics.sort((a, b) => a.slug.localeCompare(b.slug));
  });
}

export function fetchFollowedTopics(username) {
  return fetchFollowings(username).then(({ topics }) => {
    return new Set(topics.map((t) => t));
  });
}


export function handleFollowTopic(username, slug) {
  return followTopic(username, { topicSlug: slug });
}

export function handleUnfollowTopic(username, slug) {
  return unfollowTopic(username, slug);
}
