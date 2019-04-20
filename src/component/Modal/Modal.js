import React from 'react';
import './index.css'
import Button from '../Button/Button';
import { mountComponent } from '../WrapComponent/Index';

const Component = (props, _type_) => {
    class __Component__ extends React.PureComponent {
        state = {
            visible: false
        }
        componentDidMount() {
            this.setState({ visible: _type_ === 'show' ? true : (_type_ === 'hide') ? false : false })
        }
        render() {
            const extendsProps = {
                title: 'Basic Modal',
                width: '500',
                content: 'Content of the modal',
                ...props
            }
            const { title, width, content, footer } = extendsProps;
            const { visible } = this.state;
            if (visible) {
                return (
                    <div className="TW_UI_modalContainer">
                        <div className="TW_UI_modalDetail" style={{ width: isNaN(width) ? width : width + 'px' }}>
                            <div className="TW_UI_modalTitle">
                                {title}
                                <span
                                    className="status iconfont icon-quxiao"
                                    onClick={() => this.setState({ visible: false })}
                                >
                                </span>
                            </div>
                            <div className="TW_UI_modalContent">
                                {content}
                            </div>
                            {
                                footer ?
                                    <div className="TW_UI_modalFooter">
                                        {footer}
                                    </div> :
                                    <div className="TW_UI_modalFooter">
                                        <Button onClick={() => this.setState({ visible: false })}>取消</Button>
                                        <Button type='primary'>确定</Button>
                                    </div>
                            }
                        </div>
                    </div>
                )
            } else {
                return null;
            }
        }
    }
    mountComponent(() => <__Component__ />)
}
const Modal = {}

const setInstance = () => {
    ['show', 'hide'].forEach(_type_ => {
        const key = _type_
        Modal[_type_] = args => Component(args, key)
    })
}

setInstance()
export default Modal;