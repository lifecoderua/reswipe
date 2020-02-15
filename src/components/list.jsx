import React from 'react';
import Reddit from '../models/reddit';

// function List() {
//
//
//   const payload = `<table> <tr><td> <a href="https://www.reddit.com/r/Art/comments/f46z6s/the_outlaw_me_origami_2020/"> <img src="https://b.thumbs.redditmedia.com/CXyGm_9_o6rQjfsEJZ6scHAOeS0TXHzAZv8WwfllxiA.jpg" alt="The Outlaw, me, origami, 2020" title="The Outlaw, me, origami, 2020" /> </a> </td><td> &#32; submitted by &#32; <a href="https://www.reddit.com/user/jkonkkola_art"> /u/jkonkkola_art </a> &#32; to &#32; <a href="https://www.reddit.com/r/Art/"> r/Art </a> <br/> <span><a href="https://i.redd.it/atg2hvfrx1h41.jpg">[link]</a></span> &#32; <span><a href="https://www.reddit.com/r/Art/comments/f46z6s/the_outlaw_me_origami_2020/">[comments]</a></span> </td></tr></table>`;
//
//   return (
//     <div className="swipe-entry" dangerouslySetInnerHTML={{__html: payload}}/>
//   );
// }

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    this.fetchData();
          // this.setState({
          //   isLoaded: true,
          //   items: result.items
          // });
        // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
        // чтобы не перехватывать исключения из ошибок в самих компонентах.
        // (error) => {
        //   this.setState({
        //     isLoaded: true,
        //     error

  }

  async fetchData() {
    const result = await Reddit.getFeed(['art']);
    if (result === false) {
      this.setState({
        isLoaded: true,
        error: true,
      });
    } else {
      this.setState({
        isLoaded: true,
        items: result.items
      });
    }
    console.log(result);
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Failed to load the data.</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.src}>
              <img src={item.src}/>
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default List;
