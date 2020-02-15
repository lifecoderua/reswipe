import React from 'react';

function Entry() {
  const payload = `<table> <tr><td> <a href="https://www.reddit.com/r/Art/comments/f46z6s/the_outlaw_me_origami_2020/"> <img src="https://b.thumbs.redditmedia.com/CXyGm_9_o6rQjfsEJZ6scHAOeS0TXHzAZv8WwfllxiA.jpg" alt="The Outlaw, me, origami, 2020" title="The Outlaw, me, origami, 2020" /> </a> </td><td> &#32; submitted by &#32; <a href="https://www.reddit.com/user/jkonkkola_art"> /u/jkonkkola_art </a> &#32; to &#32; <a href="https://www.reddit.com/r/Art/"> r/Art </a> <br/> <span><a href="https://i.redd.it/atg2hvfrx1h41.jpg">[link]</a></span> &#32; <span><a href="https://www.reddit.com/r/Art/comments/f46z6s/the_outlaw_me_origami_2020/">[comments]</a></span> </td></tr></table>`;

  return (
    <div className="swipe-entry" dangerouslySetInnerHTML={{__html: payload}}/>
  );
}

export default Entry;
