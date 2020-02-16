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
      items: result.items
        .filter(Reddit.isMediaEntry)
        .map((entry) => ({
        // TODO: is it available?
        // TODO: it may be gif animation; previews are static;
        src: decodeEntities(entry.data.preview.images[0].source.url),
        type: 'image',
        community: entry.data.subreddit_name_prefixed,
        title: entry.data.title,
        author: entry.data.author,
        link: entry.data.url,
        post: `https://reddit.com${entry.data.permalink}`,
        embed: decodeEntities(Reddit.getMediaEmbed(entry)),
      })),
      after: result.after,
    };
  },

  getMediaEmbed(entry) {
    try {
      return entry.data.secure_media_embed.content
        || entry.data.crosspost_parent_list[0].secure_media_embed.content;
    } catch {
      return null;
    }

  },

  isMediaEntry(entry) {
    return entry.data.selftext === '';
  }


};

export default Reddit;
