import React, {Component} from 'react';
import Header from './components/Header';

import RBImage from './components/Image';
import ProportionalContainer from './components/ProportionalContainer';

import './styles/App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = { headerHeight: 0 };
  }

  onHeaderResize = (headerHeight) => {
    this.setState({
      headerHeight,
    });
  }

  renderHeroImageComponent(src) {
    return (
      <ProportionalContainer ratio={9/16}>
        <RBImage
          backgroundSize="cover"
          className="HeroImage"
          src={src} 
          />
      </ProportionalContainer>
    );
  }

  renderHeroImage(src) {
    return (
      <div className="HeroImage-outer">
        <div className="HeroImage-inner">
          <RBImage
            backgroundSize="cover"
            className="HeroImage"
            src={src} 
            />
        </div>
      </div>
    );
  }

  render() {
    const contentStyle = {
      paddingTop: this.state.headerHeight,
    };

    return (
      <div className="App">
        <Header onResize={this.onHeaderResize} />
        <div className="Content" style={contentStyle}>
          {this.renderHeroImage(require('./images/hero_01@2x.jpg'))}
          <div className="Section">
            <div className="BodyText">
              Aenean non vestibulum elit. Duis interdum id lectus et vulputate. 
              In porta risus vel odio laoreet, ac congue metus hendrerit. Mauris 
              ac imperdiet turpis. Praesent scelerisque sit amet neque vitae 
              scelerisque. Donec vel sodales quam. Praesent bibendum egestas 
              ornare. Maecenas sem mi, porta ac tellus non, auctor tempor arcu. 
              Nulla eu dictum nibh, eu sollicitudin ligula. Nulla mi enim, 
              pellentesque et mauris eleifend, eleifend maximus augue.
            </div>
          </div>
          {this.renderHeroImage(require('./images/hero_02@2x.jpg'))}
        </div>
      </div>
    )
  }
}

export default App;
