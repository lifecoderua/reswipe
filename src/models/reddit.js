import RedditApi from '../api/reddit.api';

function decodeEntities(encodedString) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = encodedString;
  return textArea.value;
}

const Reddit = {
  /**
   * Get the images feed from the selected set of communities
   *
   * Reddit.getFeed(['Art', 'mildlyinteresting', 'listentothis'])
   * @param communities array of community titles
   * @returns {void[]}
   */
  getFeed: async (communities) => {
    const result = await RedditApi.getCommunityPosts(communities);

    return {
      items: result.items.map((entry) => ({
        // TODO: is it available?
        // TODO: it may be gif animation; previews are static;
        src: decodeEntities(entry.data.preview.images[0].source.url),
        type: 'image',
        community: entry.data.subreddit_name_prefixed,
        title: entry.data.title,
        author: entry.data.author,
        link: entry.data.url,
        post: entry.data.permalink,
      })),
      after: result.after,
    };
  },
};

export default Reddit;
