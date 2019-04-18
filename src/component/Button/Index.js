import React from 'react';
import './index.css';
import Button from './Button';
import Notification from '../Notification/Notification';
import Intrudction from '../ComponentIntruction/Index'
import CaseContainer from '../Case/Index';
import Test from './Test';

const component = () => {
    const detail = `<Button onClick={() => { Notification.success({ msg: '成功喽' }) }} ></Button>`
    const CaseList = [
        () => <Button onClick={() => { Notification.success({ msg: '您点击了Default按钮' }) }} >Default</Button>,
        () => <Button type="primary" onClick={() => { Notification.success({ msg: '您点击了Primary按钮' }) }}>Primary</Button>,
        () => <Button type="success" onClick={() => { Notification.success({ msg: '您点击了Success按钮' }) }}>Success</Button>,
        () => <Button type="warning" onClick={() => { Notification.warning({ msg: '您点击了Warning按钮' }) }}>Warning</Button>,
        () => <Button type="danger" onClick={() => { Notification.fail({ msg: '您点击了Error按钮' }) }}>Error</Button>,
        () => <Button loading>111</Button>,
        () => <Button disabled>Disabled</Button>,
    ]
    const test = [
        () => <Test></Test>
    ]
    return (
        <div className="container">
            <CaseContainer CaseList={CaseList} />
            <CaseContainer CaseList={test} />
            <Intrudction detail={detail} />
        </div>
    );
}

const ButtonComponent = {
    path: '/button',
    component,
    name: '按钮组件',
    author: 'xy'
}

export default ButtonComponent;