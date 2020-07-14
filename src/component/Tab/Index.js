import React from 'react';
import Intrudction from '../ComponentIntruction/Index';
import Tab from './Tab';
import Test from './test';

const { Panel } = Tab;
const component = () => {
  const intrudction1 = {
    detail: `
        import { Tab } from 'three-work-ui'
        const { Panel } = Tab
        <Tab activeKey={activeKey} onChange={activeKey => this.onChange(activeKey)}>
            <Panel title='tab1' key='1' disabled={true}>tab1 content</Panel>
            <Panel title='title2' key='2'>title2 content</Panel>
            <Panel title='tab3' key='3'>tab3 content</Panel>
        </Tab>`,
    apis: {
      title: 'Tab',
      values: [
        {
          property: 'activeKey',
          summary: '激活面板的key',
          _type_: '"string | number" ',
          defaultValue: '无',
        },
        {
          property: 'defaultActiveKey',
          summary: '默认激活面板',
          _type_: '"string | number" ',
          defaultValue: '无',
        },
      ],
    },
  };

  const intrudction2 = {
    detail: ``,
    apis: {
      title: 'Tab.Panel',
      values: [
        {
          property: 'title',
          summary: '面板标题',
          _type_: 'ReactNode',
          defaultValue: '无',
        },
        {
          property: 'key',
          summary: '面板的key',
          _type_: 'any',
          defaultValue: '无',
        },
        {
          property: 'disabled',
          summary: '面板禁用状态',
          _type_: 'boolean',
          defaultValue: 'false',
        },
      ],
    },
  };
  return (
    <div>
      <div style={{ width: '600px' }}>
        <Tab defaultActiveKey="1">
          <Panel title="tab1" key="1">
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
      <Test />
      <Intrudction intrudction={intrudction1} />
      <Intrudction intrudction={intrudction2} />
    </div>
  );
};

export default {
  path: '/tabs',
  component,
  name: '选项卡 - Tab',
  author: 'Ada',
};
