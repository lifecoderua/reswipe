import RedditApi from '../api/reddit.api';

const supportedTags = [
  'IMG'
];

const Reddit = {
  /**
   * Get the images feed from the selected set of communities
   *
   * Reddit.getFeed(['Art', 'mildlyinteresting', 'listentothis'])
   * @param communities array of community titles
   * @returns {void[]}
   */
  getFeed: async (communities) => {
    // TODO: add communities fetch request. If RSS - use a separate request per community,
    //  as there is a global posts limit (25 per feed)

    const posts = await RedditApi.getCommunityPosts(communities);
    console.log(posts);

    const entries = [
      `<table> <tr><td> <a href="https://www.reddit.com/r/Art/comments/f46z6s/the_outlaw_me_origami_2020/"> <img src="https://b.thumbs.redditmedia.com/CXyGm_9_o6rQjfsEJZ6scHAOeS0TXHzAZv8WwfllxiA.jpg" alt="The Outlaw, me, origami, 2020" title="The Outlaw, me, origami, 2020" /> </a> </td><td> &#32; submitted by &#32; <a href="https://www.reddit.com/user/jkonkkola_art"> /u/jkonkkola_art </a> &#32; to &#32; <a href="https://www.reddit.com/r/Art/"> r/Art </a> <br/> <span><a href="https://i.redd.it/atg2hvfrx1h41.jpg">[link]</a></span> &#32; <span><a href="https://www.reddit.com/r/Art/comments/f46z6s/the_outlaw_me_origami_2020/">[comments]</a></span> </td></tr></table>`,
      `<table> <tr><td> <a href="https://www.reddit.com/r/Art/comments/f44rkd/for_me_me_pen_2020/"> <img src="https://b.thumbs.redditmedia.com/IxUD5DtejSX_97_NVRrhivoEYi3g9rnvOEUwcTG5urM.jpg" alt="For Me?, me, pen, 2020" title="For Me?, me, pen, 2020" /> </a> </td><td> &#32; submitted by &#32; <a href="https://www.reddit.com/user/lizcoco"> /u/lizcoco </a> &#32; to &#32; <a href="https://www.reddit.com/r/Art/"> r/Art </a> <br/> <span><a href="https://i.redd.it/b1metc8fr0h41.jpg">[link]</a></span> &#32; <span><a href="https://www.reddit.com/r/Art/comments/f44rkd/for_me_me_pen_2020/">[comments]</a></span> </td></tr></table>`
    ];

    return entries.map((entry) => Reddit.extractPayload(entry));
  },

  /**
   * Process .rss feed into clean data
   *
   * @param rawPayload rss feed entry
   */
  extractPayload: (rawPayload) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawPayload, 'text/html');
    // or a more broad one
    const contentNode = doc.querySelector('a');
    const contentLink = contentNode.getAttribute('href');
    const contentChild = doc.querySelector('a').firstElementChild;

    if (!supportedTags.includes(contentChild.tagName)) {
      return false;
    }

    // doc.querySelector('a').firstElementChild.tagName; // 'IMG'
    // doc.querySelector('a').innerHTML;
    //
    // // author
    // doc.querySelector('a[href*="/user/"]').outerHTML;
    // console.log(doc);

    return {
      link: contentLink,
      content: contentNode.innerHTML,
      author: doc.querySelector('a[href*="/user/"]').outerHTML,
    };
  }
};

export default Reddit;
