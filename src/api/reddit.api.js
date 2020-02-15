const RedditApi = {
  /**
   * Request selected Reddit communities
   *
   * https://www.reddit.com/r/Art+listentothis/.json[?after=xxx]
   * @param communities array of requested communities
   * @param after string After pagination key
   * @returns {array, string} posts from the selected communities and next pagination id
   */
  getCommunityPosts: async (communities, after=null) => {
    try {
      const afterLink = after ? `?after=${after}` : '';
      const result =
        await fetch(`https://www.reddit.com/r/${communities.join('+')}/.json${afterLink}`);
      const json = await result.json();
      return {
        items: json.data.children,
        next: json.data.after,
      };
    } catch(err) {
      console.log('Error during community fetch', err);
      return false;
    }
  },
};

export default RedditApi;
