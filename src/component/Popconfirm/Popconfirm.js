import React from 'react';
import { mountComponent } from '../WrapComponent/Index'

const Popconfirm = props => {
    return (
        <div>
            <div className='TW_UI_popConfirmChildren' onClick={(e) => openPopconfirmContainer(e, props)}>
                {props.children || ''}
            </div>
        </div>
    )
}

const openPopconfirmContainer = (e, props) => {
    const extendsProps = {
        onConfirm: () => console.log('onConfirm'),
        onCancel: () => console.log('onCancel'),
        ...props,
        visible: true,
    }
    // console.log(offsetLeft)
    const left = e.clientX
    const top = e.clientY
    const MAX_TOP = 110
    const MAX_LEFT = 40
    const styles = {
        left: left - MAX_LEFT + 'px',
        top: top - MAX_TOP + 'px'
    }

    class PopConfirm extends React.PureComponent {
        state = {
            visible: extendsProps.visible || false,
            show: false,
            timeout: null
        }

        close = () => {
            this.setState({ show: false }, () => setTimeout(() => this.setState({ visible: false }), 300))
            extendsProps.onCancel()
        }

        submit = () => {
            this.setState({ show: false }, () => setTimeout(() => this.setState({ visible: false }), 300))
            extendsProps.onConfirm()
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
                    <div className='TW_UI_popconfirmMask' onClick={this.close} />
                    <div className={'TW_UI_popconfirmContainer ' + className} style={{ ...styles }}>
                        <div className='_TW_UI_popconfirmContext'>
                            <span className='TW_UI_popconfirmIcon'>
                                <i className='icon-yiwen iconfont'></i>
                            </span>
                            {props.title || 'Are you sure to delete ?'}
                        </div>
                        <div className='TW_UI_popconfirmFooter'>
                            <span onClick={this.close}>{props.cancelText || 'cancel'}</span>
                            <span onClick={this.submit}>{props.okText || 'ok'}</span>
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
