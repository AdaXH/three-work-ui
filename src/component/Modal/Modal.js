import React from 'react';
import './index.css'
import Button from '../Button/Button';
import { mountComponent, unMountContainer } from '../WrapComponent/Index';

const Component = (props, _type_) => {
    const basicStyle = {
        top: "300px",
        transform: "scale3d(0.8,0.8,0.8) translateX(-50%)"
    }
    const showStyles = {
        transform: "scale3d(1,1,1) translateX(-50%)",
        opacity: "1",
        top: "100px"
    }
    class __Component__ extends React.PureComponent {
        state = {
            visible: false,
            show: false
        }

        componentDidMount() {
            this.setState({
                visible: _type_ === 'show' ? true : (_type_ === 'hide') ? false : false,
                show: false
            }, () => {
                setTimeout(() => {
                    this.setState({ show: true })
                }, 0)
            })
        }
        close = () => {
            this.setState({
                show: false,
            }, () => {
                setTimeout(() => {
                    this.setState({ visible: false }, () => unMountContainer(this.container))
                }, 300)
            })
        }
        render() {
            const extendsProps = {
                title: 'Basic Modal',
                width: '500',
                content: 'Content of the modal',
                ...props
            }
            const { title, width, content, footer } = extendsProps;
            const { visible, show } = this.state;
            const style = show ? showStyles : basicStyle;
            return (
                <div ref={container => this.container = container}>
                    {
                        visible &&
                        <div className="TW_UI_modalContainer">
                            <div className="TW_UI_modalContainer_float" onClick={this.close}></div>
                            <div className={"TW_UI_modalDetail"} style={{ width: isNaN(width) ? width : width + 'px', ...style }}>
                                <div className="TW_UI_modalTitle">
                                    <b>{title}</b>
                                    <span
                                        className="status iconfont icon-quxiao"
                                        onClick={this.close}
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
                                            <Button onClick={this.close}>取消</Button>
                                            <Button type='primary'>确定</Button>
                                        </div>
                                }
                            </div>
                        </div>
                    }
                </div>
            )
        }
    }
    mountComponent(() => <__Component__ />, 'modal')
}
const Modal = {}

const setInstance = () => {
    ['show', 'hide'].forEach(_type_ => {
        const key = _type_
        Modal[_type_] = props => Component(props, key)
    })
}

setInstance()
export default Modal;