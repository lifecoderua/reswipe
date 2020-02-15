import './list.css';
import 'swiper/css/swiper.css';

import React from 'react';
import Reddit from '../models/reddit';
import Swiper from 'react-id-swiper';


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

    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Failed to load the data.</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Swiper {...swiperParams}>
          {items.map(item => (
            <li key={item.src} className="swiper-slide">
              <img src={item.src} className="media" alt=""/>
            </li>
          ))}
        </Swiper>
      );
    }
  }
}

export default List;
