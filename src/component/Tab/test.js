import React from 'react';
import Tab from './Tab';

const { Panel } = Tab;

export default class Test extends React.Component {
  state = {
    activeKey: '1',
  };

  onChange = activeKey => {
    console.log('activeKey', activeKey);
    this.setState({ activeKey });
  };

  render() {
    const { activeKey } = this.state;
    return (
      <div style={{ width: '500px' }}>
        <Tab
          activeKey={activeKey}
          onChange={activeKey => this.onChange(activeKey)}
        >
          <Panel title="tab1" key="1" disabled={true}>
            tab1 content
          </Panel>
          <Panel title="title2" key="2">
            title2 content
          </Panel>
          <Panel title="tab3" key="3">
            tab3 content
          </Panel>
        </Tab>
      </div>
    );
  }
}
