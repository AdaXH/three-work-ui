import * as React from 'react'
import * as PropTypes from 'prop-types'

import './index.css'

export interface SelectProps {
    options?: Array<{ label: string | number, value: any } | string>,
    onChange?: (value: any) => void,
    defaultValue?: string,
    value?: string | number
}

export interface SelectState {
    value?: any
}

class Select extends React.Component<SelectProps, SelectProps> {

    constructor(props: SelectProps) {
        super(props)
        const value = props.value ? props.value : (props.defaultValue || '')
        this.state = {
            value
        }
    }

    static propTypes = {
        options: PropTypes.array.isRequired
    }

    static defaultProps: SelectProps = {
        options: ['option1', 'option2', 'option3'],
        onChange: (value: any) => console.log(value),
        defaultValue: 'option1',
    }

    renderOptions = () => {
        const ontions: SelectProps = {
            ...Select.defaultProps,
            ...this.props.options
        }
        const { value } = this.state
        return (
            <div className='TW_UI_selectContainer' tabIndex={1} onFocus={() => console.log('focus')}>
                <span>{value}</span>
                <div className='TW_UI_selectionApi' />
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                {this.renderOptions()}
            </React.Fragment>
        )
    }
}

export default Select