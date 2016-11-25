import { Component, PropTypes } from 'react';
import throttle from 'lodash/throttle';

export default class Resizer extends Component {
  static propTypes = {
    children: PropTypes.object,
    onResize: PropTypes.func,
  };

  constructor() {
    super();

    this.onResize = throttle(this.onResize, 10);
  }

  updateSize() {
    if (this.props.onResize) {
      this.props.onResize({ 
        width: window.innerWidth, 
        height: window.innerHeight,
      });
      return;
    }

    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  onResize = () => {
    this.updateSize();
  }

  componentWillMount() {
    window.addEventListener('resize', this.onResize);

    this.updateSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize); 
  }

  render() {
    const { children } = this.props;
    return typeof children === 'function' 
      ? children(this.state)
      : children;
  }
}
