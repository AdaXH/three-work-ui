import React from 'react'
import Toast from './Notification'
import CaseContainer from '../Case/Index';
import Intrudction from '../ComponentIntruction/Index'
import Button from '../Button/Button'

const component = () => {
    const onSuccess = (position) => {
        Toast.success({ msg: 'success ', position })
    }
    const onFail = () => {
        Toast.fail({
            msg: '错误提示!!',
            duration: 1
        })
    }
    const onWarning = () => {
        Toast.warning({
            msg: '警告!'
        })
    }
    const intrudction = {
        detail: `
        import { Notification } from 'three-work-ui'
        Notification.success({ msg: 'success !!!' })
        Notification.fail({ 
            msg: 'fail !!!',
            duration: 1
        })`,
        apis: {
            title: 'Notification',
            values:[
                {
                    property: 'Notification.api',
                    summary: '通知类型，可选值：success,warning,error,fail',
                    _type_: 'String',
                    defaultValue: '必选'
                },
                {
                    property: 'api({ msg, position, duration })',
                    summary: 'msg: 通知消息，position: 通知位置，duration: 通知时长',
                    _type_: 'String,String,Number',
                    defaultValue: 'success, right, 3'
                }
            ]
        }
    }
    const CaseList = [
        () => <Button onClick={onSuccess}>成功类通知</Button>,
        () => <Button onClick={onWarning} type="warning">警告类通知</Button>,
        () => <Button type="danger" onClick={onFail}>错误类通知</Button>,
        () => <Button onClick={() => onSuccess('top')}>top</Button>,
        () => <Button onClick={() => onSuccess('left')}>left</Button>,
    ]
    return (
        <div>
            <CaseContainer CaseList={CaseList} />
            <Intrudction intrudction={intrudction} />
        </div>
    )
}

const NotificationComponent = {
    path: '/notification',
    component,
    name: '通知 - Notification',
    author: 'Ada'
}

export default NotificationComponent