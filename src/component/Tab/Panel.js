import React, { useState, useRef, useEffect } from 'react';

export default props => {
  const [width, setWid] = useState('0');
  const ref = useRef(null);
  const { activePanel, tabs } = props;
  if (!tabs || !tabs.length) return null;
  useEffect(
    () => {
      if (ref.current && width === '0' && tabs) {
        setWid(ref.current.offsetWidth * tabs.length + 'px');
      }
    },
    [ref]
  );
  return (
    <div className="TW_UI_tabPanelContainer" ref={ref}>
      <div
        className="TW_UI_tabPanelWrap"
        style={{
          width,
          transform: `translate3d(-${activePanel &&
            (activePanel * parseInt(width)) / tabs.length}px, 0, 0)`,
        }}
      >
        {tabs.map(item => (
          <div className="TW_UI_tabPanelItem" key={item.key}>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};
