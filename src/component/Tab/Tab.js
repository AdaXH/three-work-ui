import React, { useEffect, useRef } from 'react';
import { useSetState } from 'react-use';
import Panel from './Panel';
import './index.less';

const Tab = props => {
  const [state, setState] = useSetState(() => {
    const activeKey = props.activeKey || props.defaultActiveKey || undefined;
    const { children } = props;
    const tabs = [];
    children instanceof Array &&
      children.forEach(item => {
        if (item && item instanceof Object && 'type' in item) {
          tabs.push({
            key: item.key,
            title: item.props.title || '',
            disabled: item.props.disabled || false,
            content: item.props.children,
          });
        }
      });
    return { activeKey, tabs, currentTab: false };
  });
  const ref = useRef(null);
  useEffect(
    () => {
      setState({ activeKey: props.activeKey });
    },
    [props.activeKey]
  );
  const { tabs, activeKey, currentTab } = state;
  let style = {};
  if (currentTab) {
    style = {
      transform: `translate3d(${currentTab.left}, 0, 0)`,
      width: currentTab.width,
    };
  }
  const handleClickTab = async activeKey => {
    props.onChange && props.onChange(activeKey);
    await setState({ activeKey });
  };
  useEffect(
    () => {
      saveCurrentTab(ref.current);
    },
    [activeKey]
  );
  const saveCurrentTab = tabContainer => {
    if (tabContainer) {
      for (let i = 0, len = tabContainer.children.length; i < len; i++) {
        const item = tabContainer.children[i];
        if (/TW_UI_tabCurrent_true/.test(item.className)) {
          setState({
            currentTab: {
              left: item.offsetLeft + 'px',
              width: item.clientWidth + 'px',
              index: Number(item.getAttribute('data-index')) || 0,
            },
          });
          break;
        }
      }
    }
  };
  return (
    <div>
      <div className="TW_UI_tabHeaderContainer" ref={ref}>
        {tabs.length !== 0 &&
          tabs.map((item, index) => (
            <div
              onClick={() =>
                !item.disabled &&
                item.key !== activeKey &&
                handleClickTab(item.key)
              }
              className={`TW_UI_tabItem TW_UI_tabCurrent_${item.key ===
                activeKey} ${
                item.disabled ? 'TW_UI_tabItemDisabled' : 'TW_UI_tabItemDefault'
              }`}
              key={item.key}
              data-index={index}
            >
              {item.title}
            </div>
          ))}
        <div className="TW_UI_tabAnchor" style={{ ...style }} />
      </div>
      <Tab.Panel tabs={tabs} activePanel={currentTab && currentTab.index} />
    </div>
  );
};
Tab.Panel = Panel;
export default Tab;
