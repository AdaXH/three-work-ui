/*
 * @Author: Ada
 * @Date: 2019-05-21 17:04:05
 * @Last Modified by: Ada - 向晗
 * @Last Modified time: 2020-06-19 14:50:27
 */
import * as React from 'react';
import Panel from './Panel';
import styles from './index.less';

class Tab extends React.Component<TabProps, TabState> {
  constructor(props) {
    super(props);
    const activeKey = props.activeKey || props.defaultActiveKey || undefined;
    const { children } = this.props;
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
    this.state = { activeKey, tabs, currentTab: false };
  }
  static Panel = Panel;
  tabContainer;

  saveCurrentTab = tabContainer => {
    if (tabContainer) {
      for (let i = 0, len = tabContainer.children.length; i < len; i++) {
        let item: any = tabContainer.children[i];
        if (/TW_UI_tabCurrent_true/.test(item.className)) {
          this.setState({
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

  componentDidMount() {
    !!this.tabContainer && this.saveCurrentTab(this.tabContainer);
  }

  handleClickTab = activeKey => {
    this.props.onChange && this.props.onChange(activeKey);
    this.setState({ activeKey }, () => this.saveCurrentTab(this.tabContainer));
  };

  static getDerivedStateFromProps(nextProps, preState) {
    if ('activeKey' in nextProps && preState.activeKey !== nextProps.activeKey)
      return { activeKey: nextProps.activeKey };
    return null;
  }

  renderHeader = () => {
    const { tabs, activeKey, currentTab } = this.state;
    let style = {};
    if (currentTab instanceof Object) {
      style = {
        transform: `translate3d(${currentTab.left}, 0, 0)`,
        width: currentTab.width,
      };
    }
    return (
      <div
        className="TW_UI_tabHeaderContainer"
        ref={ref => (this.tabContainer = ref)}
      >
        {tabs.length !== 0 &&
          tabs.map((item, index) => (
            <div
              onClick={() =>
                !item.disabled &&
                item.key !== activeKey &&
                this.handleClickTab(item.key)
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
    );
  };

  rendderPanel = () => {
    const { tabs, currentTab } = this.state;
    return (
      <Tab.Panel
        tabs={tabs}
        activePanel={currentTab instanceof Object && currentTab.index}
      />
    );
  };

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.rendderPanel()}
      </div>
    );
  }
}

export default Tab;
