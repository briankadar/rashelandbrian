import React from 'react';
import '../styles/components/VCContainer.scss';

const outerStyle = {
  display: 'table',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
}

const innerStyle = {
  display: 'table-cell';
  verticalAlign: 'middle';
};

const VCContainer = ({children}) => (
  <div className="VCContainer" style={outerStyle}>
    <div style={innerStyle}>
      {children}
    </div>
  </div>
);

export default VCContainer;
