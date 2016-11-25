import React, { Component, PropTypes } from 'react';
import loadImage from '../utils/loadImage';
import cx from 'classnames';
import '../styles/components/Image.scss';

class Image extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    backgroundSize: PropTypes.string,
  };

  static defaultProps = {
    backgroundSize: 'auto',
  };

  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }

  async componentDidMount() {
    await loadImage(this.props.src);
    this.setState({ loaded: true });
  }

  render() {
    const { src, className, backgroundSize, ...rest } = this.props;
    return (
      <div 
        {...rest}
        className={cx(
          className, {
            Image: true,
            'Image--loaded': this.state.loaded
          }
        )}>
        <div className="Image--inner"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: '50% 50%',
            backgroundSize,
          }}
        />
      </div>
    );
  }
}

export default Image;
