import React from 'react'
import { mountComponent } from '../WrapComponent/Index'
import './index.css'

export interface NotificationProps {
    duration?: number | null,
    msg?: React.ReactNode,
    position?: string
}

export interface NotificationState {
    visible?: boolean,
    show?: boolean,
    _type_?: string,
    timer?: any
}

export interface NotificationInstance {
    [key: string]: any
}


const Notification: NotificationInstance = { }

const setInstance = () => {
    ['success', 'fail', 'warning', 'error'].forEach(_type_ => {
        const key = _type_
        Notification[_type_] = (args: any) => Component(args, key)
    })
}

setInstance()

const Component = (props: NotificationProps, _type_: string) => {

    const iconType = (_type_: string) => {
        let result = 'icon-ico_commodity_defaul'
        if (_type_ === 'fail' || _type_ === 'error') result = 'icon-cancel'
        if (_type_ === 'warning') result = 'icon-wenti'
        return result
    }

    const iconColor = (_type_: string) => {
        let color = '#52c41a'
        if (_type_ === 'fail' || _type_ === 'error') color = '#f5222d'
        if (_type_ === 'warning') color = '#f37e1a'
        return color
    }

    const positionStyle = (position: string, show: boolean) => {
        if (position === 'right' || typeof position !== 'string') {
            return {
                toast: show ? 'TW_UI_toastRightShow' : 'TW_UI_toastRightHide',
                toastContainer: 'TW_UI_toastRight'
            }
        }
        if (position === 'top') {
            return {
                toast:  show ? 'TW_UI_toastTopShow' : 'TW_UI_toastTopHide', 
                toastContainer: 'TW_UI_toastCenter'
            }
        }
        if (position === 'left') {
            return {
                toast: show ? 'TW_UI_toastLeftShow' : 'TW_UI_toastLeftHide',
                toastContainer: 'TW_UI_toastLeft'
            }
        }
        return {
            toast: show ? 'TW_UI_toastRightShow' : 'TW_UI_toastRightHide',
            toastContainer: 'TW_UI_toastRight'
        }
    }

    class __Component__ extends React.Component<NotificationState> {

        static defaultProps = {
            msg: '这是一个通知',
            duration: 3.5,
            position: 'right'
        }

        state: NotificationState = {
            show: true,
            visible: true,
            timer: () => void 0,
            _type_
        }

        componentDidMount() {
            clearTimeout(this.state.timer)
            const { duration } = { ...__Component__.defaultProps, ...props }
            this.setState({
                timer: setTimeout(() => this.setState({ show: false }, () => setTimeout(() => this.setState({ visible: false }), 1000)), Number(duration) * 1000)
            })
        }

        componentWillUnmount() {
            this.setState = () => { return }
            clearTimeout(this.state.timer)
        }

        render() {
            const extendsProps = {
                msg: typeof props === 'string' ? props : 'notification !!!',
                position: 'right',
                ...props,
            }
            const { show = true, visible, _type_ = 'success'} = this.state
            const { msg, position } = extendsProps
            return (
                <div>
                    {
                        visible && <div className={'toastContainer ' + positionStyle(position, show).toastContainer}>
                            <div className={'toast ' + positionStyle(position, show).toast}>
                                <i style={{ color: iconColor(_type_) }} className={'status iconfont ' + iconType(_type_)}></i>
                                <span>{msg}</span>
                            </div>
                        </div>
                    }
                </div >
            )
        }

    }
    mountComponent(() => <__Component__ />, 'notification')
}

export default Notification