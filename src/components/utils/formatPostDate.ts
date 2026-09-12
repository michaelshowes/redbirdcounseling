/** Post dates render identically on the server and in the live-preview client
 * tree, so the locale and time zone are pinned rather than left to the runtime -
 * otherwise the two trees can disagree and React reports a hydration mismatch. */
export const formatPostDate = (value?: string | null) => {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(date);
};
