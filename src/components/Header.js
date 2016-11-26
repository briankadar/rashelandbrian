import React, {PureComponent, PropTypes} from 'react';

import Resizer from './Resizer';
import loadImage from '../utils/loadImage';

import throttle from 'lodash/throttle';
import cx from 'classnames';

import '../styles/components/Header.scss';

const HEADER_HEIGHT_RANGE = {
  default: [250, 80],
  mobile: [150, 80],
};

const HEADER_PADDING_RANGE = {
  default: [65, 18],
  mobile: [35, 18],
};

const SCROLL_RANGE = {
  default: [0, 180],
  mobile: [0, 100],
};

const round = (num) => Math.round(num * 2) / 2;

class Header extends PureComponent {
  static propTypes = {
    onResize: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      headerHeight: HEADER_HEIGHT_RANGE[0], 
      mobile: false,
      logoSize: { width: 0, height: 0 },
    };

    this._imgSrc = require('../images/rnb@2x.png');
    this.onScroll = throttle(this.onScroll, 1000 / 60 | 0, { leading: true });
  }

  async componentWillMount() {
    const img = await loadImage(this._imgSrc);
    const { width, height } = img;
    this.setState({
      logoLoaded: true,
      logoSize: { width, height }
    }, this.recalculateSize);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    this.onScroll();
  }

  recalculateSize = () => {
    const { mobile, logoSize } = this.state;

    const accessor = mobile ? 'mobile' : 'default';
    const headerRange = HEADER_HEIGHT_RANGE[accessor];
    const paddingRange = HEADER_PADDING_RANGE[accessor];
    const scrollRange = SCROLL_RANGE[accessor];
    
    const scrollTop = document.body.scrollTop;
    const perc = Math.min(1, scrollTop / scrollRange[1]);

    const targetHeight = 
      headerRange[0] + 
      (headerRange[1] - headerRange[0]) 
      * perc;

    const targetPadding =
      paddingRange[0] +
      (paddingRange[1] - paddingRange[0])
      * perc;

    const logoHeight = targetHeight - targetPadding * 2;

    this.setState({
      headerHeight: round(targetHeight),
      headerPadding: round(targetPadding),
      logoHeight: round(logoHeight),
      logoWidth: round(logoSize.width * logoHeight / logoSize.height),
      collapsed: Math.abs(targetHeight - headerRange[1]) < 5,
    }, () => {
      this.props.onResize(targetHeight);
    });
  }

  onResize = ({ width }) => {
    this.setState({
      mobile: width <= 600,
    }, this.recalculateSize);
  }

  onScroll = () => {
    this.recalculateSize();
  }

  renderLogo() {
    return (
      <img 
        style={{
          width: this.state.logoWidth, 
          height: this.state.logoHeight
        }}
        src={this._imgSrc} />
    );
  }

  render() {
    const headerStyle = {
      height: this.state.headerHeight,
      padding: this.state.headerPadding,
    };

    return (
      <Resizer onResize={this.onResize}>
        <div style={headerStyle} className={cx({
          Header: true,
          'Header--collapsed': this.state.collapsed,
          'Header--logoLoaded': this.state.logoLoaded,
        })}>
          <div className="HeaderContent">
            <div className="HeaderContent-side HeaderContent-side--left">
              <span className="HeaderContent-side-content">
                Sept 4, 2017
              </span>
            </div>
            <div className="HeaderContent-middle" 
              style={{width: this.state.logoWidth}}>
              {this.renderLogo()}
            </div>
            <div className="HeaderContent-side HeaderContent-side--right">
              <span className="HeaderContent-side-content">
                5777, 13 אלול
              </span>
            </div>
          </div>
        </div>
      </Resizer>
    );
  }
}

export default Header;
