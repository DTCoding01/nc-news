import { getArticles } from "../../api";

export default function timeAgo(timestamp) {
  const now = new Date();
  const postDate = new Date(timestamp);
  const diffInSeconds = Math.floor((now - postDate) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (weeks > 0) {
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  } else if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return "Just now";
  }
}

export function splitContentIntoParagraphs(content) {
  let splitContent = content.split(". ");

  if (splitContent[splitContent.length - 1] === ".") {
    splitContent.pop();
  }
  return splitContent;
}

export function fetchAllArticles({ sortBy = "created_at", order = "desc", topicName = ""} = {}) {
  let page = 1;
  let limit = 10;


  return getArticles({ sortBy, order, topicName })
    .then(({ totalCount }) => {
      limit = totalCount;
    })
    .then(() => {
      return getArticles({ page, limit, sortBy, order, topicName });
    })
    .then(({ articles }) => {
      return articles;
    });
}
