export default function getTimeSincePost(dateString) {
  const postDate = new Date(dateString);
  const currentDate = new Date();

  const timeDiffInMs = currentDate.getTime() - postDate.getTime();

  let minutes = Math.floor(timeDiffInMs / (1000 * 60));
  if (minutes < 60) {
    if (minutes < 0) minutes = 1;
    const minutesStr = minutes === 1 ? 'minute' : 'minutes'
    return `${minutes} ${minutesStr} ago`;
  }

  const hours = Math.floor(timeDiffInMs / (1000 * 60 * 60));
  if (hours < 24) {
    return `${hours} hours ago`;
  }

  const days = Math.floor(timeDiffInMs / (1000 * 60 * 60 * 24));
  if (days < 30) {
    return `${days} days ago`;
  }

  const months = Math.floor(days / 30);
  return `${months} months ago`;
}