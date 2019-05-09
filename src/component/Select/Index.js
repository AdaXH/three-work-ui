import React from 'react'
import CaseContainer from '../Case/Index'
import Intrudction from '../ComponentIntruction/Index'
import Select from './Select'

const component = () => {

    const intrudction = {
        detail: `
        import { Input } from 'three-work-ui'

        <Input 
            type='text' 
            placeholder='size-small' 
            size='small' 
            defaultValue='12321' 
            onChange={value => console.log(value)} 
        />`,
        apis: {
            title: 'Input',
            values: [
                {
                    property: 'type',
                    summary: 'Input类型',
                    _type_: '"text" | "password" ',
                    defaultValue: 'text'
                },
                {
                    property: 'size',
                    summary: 'Input大小',
                    _type_: '"small" | "default" | "large"',
                    defaultValue: 'default'
                },
                {
                    property: 'value',
                    summary: 'Input值',
                    _type_: 'string',
                    defaultValue: '无'
                },
                {
                    property: 'defaultValue',
                    summary: 'Input默认值',
                    _type_: 'string',
                    defaultValue: '无'
                },
                {
                    property: 'placeholder',
                    summary: 'placeholder',
                    _type_: 'string',
                    defaultValue: '无'
                },
                {
                    property: 'onChange',
                    summary: '改变时回调',
                    _type_: 'func',
                    defaultValue: 'value => console.log(value)'
                }
            ]
        }
    }

    const options = ['twui', 'three', 'work', 'ui', 'three-wprk-ui']

    const CaseList = [
        () => <Select options={options} defaultValue='ui' />,
    ]
    return (
        <div>
            <CaseContainer CaseList={CaseList} />
            <Intrudction intrudction={intrudction} />
        </div>
    )
}

export default {
    path: '/select',
    component,
    name: '选择器 - Select',
    author: 'Ada'
}