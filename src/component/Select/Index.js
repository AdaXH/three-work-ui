import React from 'react';
import CaseContainer from '../Case/Index';
import Intrudction from '../ComponentIntruction/Index';
import Select from './Select';

const component = () => {
  const intrudction = {
    detail: `
        import { Select } from 'three-work-ui'
        const options = [1, 2, 3] // [ { value: 1, label: '选项一' } ]
        <Select  
            options={options} 
            placeholder='请选择'
            value={1} 
            defaultValue='12321'
            size='large'
            mutiple={true}
            onChange={value => console.log(value)} 
        />`,
    apis: {
      title: 'Select',
      values: [
        {
          property: 'options',
          summary:
            '选项，数组,item为{label: string, value: any, disabled: boolean} 或 string',
          _type_: '"Array<{} | string>" ',
          defaultValue: "['option1', 'option2', 'option3']",
        },
        {
          property: 'mutiple',
          summary: '多选',
          _type_: 'boolean',
          defaultValue: 'false',
        },
        {
          property: 'size',
          summary: '大小',
          _type_: '"small" | "default" | "large"',
          defaultValue: 'default',
        },
        {
          property: 'value',
          summary: 'Select值，会覆盖defaultValue',
          _type_: 'string',
          defaultValue: '无',
        },
        {
          property: 'defaultValue',
          summary: 'Select默认值',
          _type_: 'any',
          defaultValue: '无',
        },
        {
          property: 'width',
          summary: 'Select宽度',
          _type_: 'number | string',
          defaultValue: '100%',
        },
        {
          property: 'placeholder',
          summary: 'placeholder',
          _type_: 'string',
          defaultValue: '无',
        },
        {
          property: 'onChange',
          summary: '改变时回调',
          _type_: 'func',
          defaultValue: 'value => console.log(value)',
        },
      ],
    },
  };

  const options = ['twui', 'three', 'work', 'ui', 'three-wprk-ui-ver'];
  const options_ = [
    {
      label: 'option1',
      value: 'option1',
      disabled: true,
    },
    {
      label: 'option2',
      value: 'option2',
      disabled: false,
    },
    {
      label: 'option3',
      value: 'option3',
    },
  ];
  const CaseList = [
    () => (
      <Select
        size="small"
        options={options_}
        defaultValue="option2"
        onChange={value => console.log('get value', value)}
      />
    ),
    () => (
      <Select
        disabled={true}
        size="default"
        options={options_}
        defaultValue="option2"
        onChange={value => console.log('get value', value)}
      />
    ),
    () => (
      <Select
        size="large"
        options={options_}
        defaultValue="option2"
        onChange={value => console.log('get value', value)}
      />
    ),
  ];
  return (
    <div>
      <CaseContainer CaseList={CaseList} />
      <CaseContainer
        CaseList={[
          () => (
            <div style={{ width: '280px' }}>
              <Select
                mutiple={true}
                placeholder="请选择"
                style={{ width: '280px' }}
                options={options}
                onChange={value => console.log('get value', value)}
              />
            </div>
          ),
        ]}
      />
      <Intrudction intrudction={intrudction} />
    </div>
  );
};

export default {
  path: '/select',
  component,
  name: '选择器 - Select',
  author: 'Ada',
};
