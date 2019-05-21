import './index.css';
import React from 'react';
import Button from './Button';

export default class Text extends React.PureComponent {
    state = {
        loading: false,
        disabled: false
    }
    // dsd 
    toggleDisabled = key => this.setState(({ disabled }) => ({ disabled: !disabled }))
    toggleLoading = key => this.setState(({ loading }) => ({ loading: !loading }))

    render() {
        const { loading, disabled } = this.state
        return (
            <div className='TW_UI_buttonTest'>
                <p>控制Button：</p>
                <span style={{ marginRight: '20px' }}>
                    <Button onClick={() => this.toggleDisabled()}>toggle disabled</Button>
                </span>
                <Button onClick={() => this.toggleLoading()}>toggle loading</Button>
                <div style={{ marginTop: '20px' }}>
                    <Button loading={loading} disabled={disabled}>test</Button>
                </div>
            </div>
        )
    }
}