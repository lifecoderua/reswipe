import './list.css';
import 'swiper/css/swiper.css';

import React from 'react';
import Reddit from '../models/reddit';
import Swiper from 'react-id-swiper';
import Preferences from './preferences';

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
    this.setFocusOnSwiper();
  }

  setFocusOnSwiper() {
    if (this.swiperRef) {
      this.swiperRef.focus();
    }
  }

  async fetchData() {
    const result = await Reddit.getFeed(['art']);
    // const result = await Reddit.getFeed(['ListenToThis']);
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
    const swiperParams = {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      spaceBetween: 30,
      centeredSlides: true,

      keyboard: true,
      grabCursor: true,
    };

    function itemView(item) {
      if (item.embed) {
        return <div className="media" dangerouslySetInnerHTML={{__html: item.embed}}/>;
      } else {
        return <img src={item.src} className="media" alt=""/>;
      }
    }

    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Failed to load the data.</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Swiper
          {...swiperParams}>
          <div
            ref={(elem) => { this.swiperRef = elem; }}
            className="swiper-slide">
            <Preferences/>
          </div>
          {items.map(item => (
            <div key={item.src} className="swiper-slide">
              {itemView(item)}
              <div className="metadata">
                <p>
                  by {item.author} @ {item.community}
                </p>
                <p>
                  <a href={item.post} target="_blank">
                    <i className="material-icons">link</i>
                    original
                  </a>
                </p>
              </div>
            </div>
          ))}
        </Swiper>
      );
    }
  }
}

export default List;
