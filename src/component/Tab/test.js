import React from 'react';
import Tab from './Tab';

export default () => {
  return (
    <div style={{ width: '500px' }}>
      <Tab defaultActiveKey="2">
        <Tab.Panel title="tab1" key="1" disabled={true}>
          tab1 content
        </Tab.Panel>
        <Tab.Panel title="title2" key="2">
          title2 content
        </Tab.Panel>
        <Tab.Panel title="tab3" key="3">
          tab3 content
        </Tab.Panel>
      </Tab>
    </div>
  );
};
