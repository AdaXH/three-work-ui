import React from 'react'
import CaseContainer from '../Case/Index'
import Intrudction from '../ComponentIntruction/Index'
import Input from './Input'

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
    const CaseList = [
        () => <Input type='text' placeholder='size-small' size='small' defaultValue='small' onChange={value => console.log(value)} />,
        () => <Input type='text' placeholder='size-default' size='default' onChange={value => console.log(value)} />,
        () => <Input type='text' placeholder='disabled' disabled={true} size='default' onChange={value => console.log(value)} />,
        () => <Input type='text' placeholder='size-large' size='large' onChange={value => console.log(value)} />,
    ]
    return (
        <div>
            <CaseContainer CaseList={CaseList} />
            <Intrudction intrudction={intrudction} />
        </div>
    )
}

const NotificationComponent = {
    path: '/input',
    component,
    name: '输入框 - Input',
    author: 'Ada'
}

export default NotificationComponent