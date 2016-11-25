import React from 'react';

const VERTICAL = 'vertical';
const HORIZONTAL = 'horizontal';

const styles = {
  [VERTICAL]: {
    container: { width: '100%' },
    outer: { position: 'relative', width: '100%' },
  },
  [HORIZONTAL]: {
    container: { height: '100%' },
    outer: { position: 'relative', height: '100%' },
  },
};

const innerStyle = { 
  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
};

const createOuterStyle = (ratio, useHeight) => ({
  ...styles[useHeight ? HORIZONTAL : VERTICAL].outer,
  paddingTop: useHeight ? 0 : (ratio * 100) + '%',
  paddingRight: useHeight ? (ratio * 100) + '%' : 0,
});

const ProportionalContainer = ({ ratio = 1, useHeight=false, children, ...rest }) => {
  const containerStyle = styles[useHeight ? HORIZONTAL : VERTICAL].container;
  return (
    <div style={containerStyle} {...rest} >
      <div style={createOuterStyle(ratio, useHeight)}>
        <div style={innerStyle}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProportionalContainer;
