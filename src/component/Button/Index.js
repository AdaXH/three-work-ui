import React from 'react';
import './index.css';
import Button from './Button';
import Notification from '../Notification/Notification';
import Intrudction from '../ComponentIntruction/Index';
import CaseContainer from '../Case/Index';
import Test from './Test';

const component = () => {
  const intrudction = {
    detail: ` import { Button } from 'three-work-ui'`,
    apis: {
      title: 'Button',
      values: [
        {
          property: 'type',
          summary:
            '按钮的类型，可选值：default, danger, warning, primary, success',
          _type_: 'String',
          defaultValue: 'default',
        },
        {
          property: 'disabled',
          summary: '按钮的禁用状态，可选值：true | false',
          _type_: 'Boolean',
          defaultValue: 'false',
        },
      ],
    },
  };
  const CaseList = [
    () => (
      <Button
        onClick={() => {
          Notification.success({ msg: '您点击了Default按钮' });
        }}
      >
        Default
      </Button>
    ),
    () => (
      <Button
        type="primary"
        onClick={() => {
          Notification.success({ msg: '您点击了Primary按钮' });
        }}
      >
        Primary
      </Button>
    ),
    () => (
      <Button
        type="success"
        onClick={() => {
          Notification.success({ msg: '您点击了Success按钮' });
        }}
      >
        Success
      </Button>
    ),
    () => (
      <Button
        type="warning"
        onClick={() => {
          Notification.warning({ msg: '您点击了Warning按钮' });
        }}
      >
        Warning
      </Button>
    ),
    () => (
      <Button
        type="danger"
        onClick={() => {
          Notification.fail({ msg: '您点击了Error按钮' });
        }}
      >
        Error
      </Button>
    ),
    () => <Button loading />,
    () => <Button disabled>Disabled</Button>,
  ];
  const test = [() => <Test />];
  return (
    <div className="container">
      <CaseContainer CaseList={CaseList} />
      <CaseContainer CaseList={test} />
      <Intrudction intrudction={intrudction} />
    </div>
  );
};

const ButtonComponent = {
  path: '/button',
  component,
  name: '按钮 - Button',
  author: 'Zxy',
};

export default ButtonComponent;
