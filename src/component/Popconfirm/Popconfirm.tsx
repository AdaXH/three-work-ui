import React from 'react';
import { mountComponent } from '../WrapComponent/Index'
import './index.css'

export interface PopconfirmState {
    visible: boolean,
    show: boolean,
    timeout: any
}

export interface PopconfirmProps {
    children?: React.ReactNode,
    onConfirm?: () => void,
    onCancel?: () => void,
    okText?: React.ReactNode,
    cancelText?: React.ReactNode,
    visible?: boolean,
    title?: React.ReactNode
}

const Popconfirm = (props: PopconfirmProps) => {
    return (
        <div>
            <div className='TW_UI_popConfirmChildren' onClick={(e) => openPopconfirmContainer(e, props)}>
                {props.children || ''}
            </div>
        </div>
    )
}

const openPopconfirmContainer = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, props: PopconfirmProps) => {
    e.stopPropagation()
    e.preventDefault()

    const left = e.clientX
    const top = e.clientY
    const MAX_TOP = 110
    const MAX_LEFT = 40
    const styles = {
        left: left - MAX_LEFT + 'px',
        top: top - MAX_TOP + 'px'
    }

    class PopConfirm extends React.Component<PopconfirmProps, PopconfirmState> {

        static extendsProps: PopconfirmProps = {
            onConfirm: () => console.log('onConfirm'),
            onCancel: () => console.log('onCancel'),
            title: 'delete title',
            okText: 'ok',
            cancelText: 'no',
            visible: true,
            ...props
        }

        state: PopconfirmState = {
            visible: PopConfirm.extendsProps.visible || false,
            show: false,
            timeout: () => void 0
        }

        handleClick = (_type_: string) => {
            this.setState({ show: false }, () => setTimeout(() => this.setState({ visible: false }), 300))
            _type_ === 'close' ? 
                PopConfirm.extendsProps.onCancel && PopConfirm.extendsProps.onCancel()
            : 
                PopConfirm.extendsProps.onConfirm && PopConfirm.extendsProps.onConfirm()
        }

        componentDidMount() {
            const { timeout } = this.state
            clearTimeout(timeout)
            this.setState({ timeout: setTimeout(() => (this.setState({ show: true })), 0) })
        }

        componentWillUnmount() {
            this.setState(() => undefined)
        }

        renderContainer = () => {
            const { show } = this.state
            const className = show ? 'TW_UI_popconfirmShow' : 'TW_UI_popconfirmHide'
            return (
                <div>
                    <div className='TW_UI_popconfirmMask' onClick={() => this.handleClick('close')} />
                    <div className={'TW_UI_popconfirmContainer ' + className} style={{ ...styles }}>
                        <div className='_TW_UI_popconfirmContext'>
                            <span className='TW_UI_popconfirmIcon'>
                                <i className='icon-yiwen iconfont'></i>
                            </span>
                            {PopConfirm.extendsProps.title}
                        </div>
                        <div className='TW_UI_popconfirmFooter'>
                            <span onClick={() => this.handleClick('close')}>{PopConfirm.extendsProps.cancelText}</span>
                            <span onClick={() => this.handleClick('submit')}>{PopConfirm.extendsProps.okText}</span>
                        </div>
                    </div>
                </div>
            )
        }

        render() {
            const { visible } = this.state
            return (
                <div>
                    {visible && this.renderContainer()}
                </div>
            )
        }
    }

    mountComponent(() => <PopConfirm />, 'popconfirm')
}

export default Popconfirm
