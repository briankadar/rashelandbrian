import React, { Component, PropTypes } from 'react';

import loadImage from '../utils/loadImage';

class Logo extends Component {
  static propTypes = {
    alt: PropTypes.bool,
    height: PropTypes.number.isRequired,
  };

  constructor() {
    super();
    this.state = { loaded: false };
  }

  async componentWillMount() {
    if (this.state.loaded) {
      return;
    }

    await loadImage(this._getImageSrc());
    this.setState({ loaded: false });
  }

  _getImageSrc() {
    return this.props.alt 
      ? require('../images/rnb@2x.png') 
      : require('../images/rnb-alt@2x.png');
  }

  render() {
    const { }
    const src = 
  }
}