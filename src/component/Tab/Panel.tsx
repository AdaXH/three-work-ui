/*
 * @Author: Ada
 * @Date: 2019-05-21 17:04:13
 * @Last Modified by: Ada - 向晗
 * @Last Modified time: 2020-06-19 11:17:40
 */
import * as React from 'react';
import * as PropTypes from 'prop-types';
import './index.css';

export interface PanelProps {
  key?: any;
  disabled?: boolean;
  tabs: Array<any>;
  activePanel?: any;
}

export interface PanelState {
  width: string;
}

class Panel extends React.Component<PanelProps, PanelState> {
  state: PanelState = {
    width: '0',
  };

  panelContainer!: HTMLDivElement;

  renderPanel = () => {
    const { tabs, activePanel } = this.props;
    const { width } = this.state;
    return (
      <div
        className="TW_UI_tabPanelWrap"
        style={{
          width,
          transform: `translate3d(-${activePanel &&
            (activePanel * parseInt(width)) / tabs.length}px, 0, 0)`,
        }}
      >
        {tabs.length !== 0 &&
          tabs.map(item => (
            <div className="TW_UI_tabPanelItem" key={item.key}>
              {item.content}
            </div>
          ))}
      </div>
    );
  };

  componentDidMount() {
    const { width } = this.state;
    const {
      tabs: { length },
    } = this.props;
    width === '0' &&
      this.setState({ width: this.panelContainer.offsetWidth * length + 'px' });
  }

  render() {
    return (
      <div
        className="TW_UI_tabPanelContainer"
        ref={(ref: HTMLDivElement) => (this.panelContainer = ref)}
      >
        {this.renderPanel()}
      </div>
    );
  }
}

export default Panel;
