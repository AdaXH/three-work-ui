import React from 'react'
import { mountComponent } from '../WrapComponent/Index'
import './index.css'

const Notification = {}

const setInstance = () => {
    ['success', 'fail', 'warning', 'error'].forEach(_type_ => {
        const key = _type_
        Notification[_type_] = args => Component(args, key)
    })
}

setInstance()

const Component = (props, _type_) => {

    const iconType = _type_ => {
        let result = 'icon-ico_commodity_defaul'
        if (_type_ === 'fail' || _type_ === 'error') result = 'icon-cancel'
        if (_type_ === 'warning') result = 'icon-wenti'
        return result
    }

    const iconColor = _type_ => {
        let color = '#52c41a'
        if (_type_ === 'fail' || _type_ === 'error') color = '#f5222d'
        if (_type_ === 'warning') color = '#f37e1a'
        return color
    }

    const positionStyle = (position, show) => {
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
    }

    class __Component__ extends React.PureComponent {
        state = {
            show: true,
            visible: true,
            timer: undefined,
            _type_
        }

        componentDidMount() {
            clearTimeout(this.state.timer)
            const { duration } = { duration: 3.5, ...props }
            this.setState({
                timer: setTimeout(() => this.setState({ show: false }, () => setTimeout(() => this.setState({ visible: false }), 1000)), parseInt(duration) * 1000)
            })
        }

        componentWillUnmount() {
            this.setState = () => { return }
            clearTimeout(this.state.timer)
        }

        render() {
            const extendsProps = {
                msg: 'notification !!!',
                position: 'right',
                ...props,
            }
            const { show, visible, _type_} = this.state
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