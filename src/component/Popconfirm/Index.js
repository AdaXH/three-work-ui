import React from 'react';
import './index.css';
import Intrudction from '../ComponentIntruction/Index';
import CaseContainer from '../Case/Index';
import Popconfirm from './Popconfirm';
import Notification from '../Notification/Notification';

const component = () => {
  const intrudction = {
    detail: `           import { Popconfirm } from 'three-work-ui'
            ReactDOM.render(
                <Popconfirm 
                    title="Are you sure to delete ?" 
                    onConfirm={Notification.success({ msg: 'delete something '})} 
                >
                    <a>Delete</a>
                </Popconfirm>,
            mountNode
            );
        `,
    apis: {
      title: 'Popconfirm',
      values: [
        {
          property: 'onConfirm',
          summary: '确认回调',
          _type_: 'function',
          defaultValue: 'void',
        },
        {
          property: 'onCancel',
          summary: '取消回调',
          _type_: 'function',
          defaultValue: 'void',
        },
        {
          property: 'title',
          summary: '文案提示',
          _type_: 'string',
          defaultValue: 'Are you sure to delete ?',
        },
        {
          property: 'okText',
          summary: '确认文案',
          _type_: 'string',
          defaultValue: 'ok',
        },
        {
          property: 'cancelText',
          summary: '取消文案',
          _type_: 'string',
          defaultValue: 'cancel',
        },
      ],
    },
  };
  const CaseList = [
    () => (
      <div style={{ marginTop: '100px' }}>
        <Popconfirm
          onConfirm={() => Notification.success({ msg: 'delete something' })}
          title="Are you sure to delete ?"
        >
          <a href="void 0">delete</a>
        </Popconfirm>
      </div>
    ),
    () => (
      <div style={{ marginTop: '100px' }}>
        <Popconfirm
          onConfirm={() => Notification.success({ msg: 'delete something' })}
          title="自定义文案删除 ?"
          okText="确定"
          cancelText="取消"
        >
          <p>自定义文案删除</p>
        </Popconfirm>
      </div>
    ),
  ];
  return (
    <div className="container">
      <CaseContainer CaseList={CaseList} />
      <Intrudction intrudction={intrudction} />
    </div>
  );
};

const ModalComponent = {
  path: '/popconfirm',
  component,
  name: '气泡确认 - Popconfirm',
  author: 'Ada',
};

export default ModalComponent;
