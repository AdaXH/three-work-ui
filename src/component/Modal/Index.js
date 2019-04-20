import React from 'react';
import './index.css';
import Modal from './Modal';
import Intrudction from '../ComponentIntruction/Index'
import CaseContainer from '../Case/Index';
import Button from '../Button/Button';

const component = () => {
    const openModal = () => {
        Modal.show({
            title: 'Test Modal',
            width: '1000',
            content: <div>Test of the Modal Content</div>,
            footer: null
        })
    }
    const intrudction = {
        detail: ` import { Modal } from 'three-work-ui'`,
        apis: {
            title: 'Modal',
            values: [
                {
                    property: 'Modal.api',
                    summary: '对话框是否显示，可选值：show, hide',
                    _type_: 'String',
                    defaultValue: 'hide'
                },
                {
                    property: 'api({ title, width, content, footer })',
                    summary: 'title: 标题，width: 对话框宽度, content: 内容，footer: 底部内容',
                    _type_: 'String,String,(String | ReactNode),(String | ReactNode)',
                    defaultValue: 'Basic Modal, 500, Content of the modal, <Button>取消</Button><Button>确定</Button> '
                }
            ]
        }
    }
    const CaseList = [
        () => <Button type="primary" onClick={openModal}>Open Modal</Button>
    ]
    return (
        <div className="container" >
            <CaseContainer CaseList={CaseList} />
            <Intrudction intrudction={intrudction} />
        </div>
    );
}

const ModalComponent = {
    path: '/Modal',
    component,
    name: '对话框 - Modal',
    author: 'Zxy'
}

export default ModalComponent;