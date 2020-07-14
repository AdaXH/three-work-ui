import * as React from 'react';
import './index.css'
import Button from '../Button/Button';
import { mountComponent, unMountContainer } from '../WrapComponent/Index';

export interface ModalState {
    visible?: boolean,
    show?: boolean,
    _type_?: string
}

export interface ModalProps extends ModalState{
    title?: string,
    width?: string,
    content?: HTMLElement | null | undefined | string,
    footer?: HTMLElement | null | undefined | string
}

const Component = (props: ModalProps, _type_: string) => {
    const basicStyle = {
        top: "300px",
        transform: "scale3d(0.8,0.8,0.8) translateX(-50%)"
    }
    const showStyles = {
        transform: "scale3d(1,1,1) translateX(-50%)",
        opacity: "1",
        top: "100px"
    }
    class DialogComponent extends React.PureComponent<ModalProps, ModalState> {
        static defaultProps = {
            title: 'Basic Modal',
            width: '500',
            content: 'Content of the modal',
        }
        state: ModalState = {
            visible: false,
            show: false,
            _type_
        }
        container: HTMLElement | null | undefined
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
      );
    }
    close = () => {
      this.setState(
        {
          show: false,
        },
        () => {
          setTimeout(() => {
            this.setState({ visible: false }, () =>
              unMountContainer(this.container)
            );
          }, 300);
        }
        render() {
            const extendsProps = {
                ...DialogComponent.defaultProps,
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
                            <div className={"TW_UI_modalDetail"} style={{ width: /px/.test(width) ? width : width + 'px', ...style }}>
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
                <div className="TW_UI_modalContent">{content}</div>
                {footer ? (
                  <div className="TW_UI_modalFooter">{footer}</div>
                ) : (
                  <div className="TW_UI_modalFooter">
                    <Button onClick={this.close}>取消</Button>
                    <Button type="primary">确定</Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }
    mountComponent(() => <DialogComponent />, 'modal')
}
export interface Modal {
    [key: string]: any
}
const Modal: Modal = {}

const setInstance = () => {
    ['show', 'hide'].forEach(_type_ => {
        const key = _type_
        Modal[_type_] = (props: any) => Component(props, key)
    })
}

setInstance();
export default Modal;
