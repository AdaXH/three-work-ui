import * as React from 'react'
import * as PropTypes from 'prop-types'
import './index.css'

export interface InputState {
    value?: string
}

export interface InputProps extends InputState {
    defaultValue?: string,
    onChange?: (value: string) => void,
    size?: 'default' | 'small' | 'large',
    type?: string,
    disabled?: boolean,
    placeholder?: string
}

class Input extends React.Component<InputProps, InputState> {

    constructor(props: InputProps) {
        super(props)
        const value = props.value || props.defaultValue || ''
        this.state = { value }
    }

    static getDerivedStateFromProps(nextProps: InputProps, preState: InputState) {
        if ('value' in nextProps && nextProps.value !== preState.value) return { value: nextProps.value }
        return null
    }

    static availableValues = {
        size: ['default', 'small', 'large'],
        type: ['text', 'password']
    }

    static propTypes = {
        size: PropTypes.oneOf(Input.availableValues.size),
        type: PropTypes.oneOf(Input.availableValues.type),
    }

    static defaultProps: InputProps = {
        defaultValue: '',
        size: 'default',
        type: 'text',
        disabled: false
    }

    input!: HTMLInputElement

    setInputRef = (input: HTMLInputElement) => {
        this.input = input
    }

    setValue = () => {
        const { value } = this.props
        if (!!value) return
        this.setState({ value: this.input.value }, () => this.props.onChange && this.props.onChange(this.input.value))
    }

    check(checkType: 'size' | 'type', value: any) {
        const { availableValues } = Input
        if (availableValues[checkType].includes(value)) return value
        else return checkType === 'size' ? 'default' : 'text'
    }

    renderInput() {
        const { size, type, placeholder = '', disabled } = {
            ...Input.defaultProps,
            ...this.props
        }
        const { value } = this.state
        return (
            <input
                type={type}
                value={value}
                disabled={disabled}
                placeholder={placeholder}
                ref={this.setInputRef}
                className={`TW_UI_input TW_UI_input_${this.check('size', size)} TW_UI_input_${this.check('type', type)}`}
                onChange={this.setValue}
            />
        )
    }

    render() {
        return (
            <div className='TW_UI_inputContainer'>
                {this.renderInput()}
            </div>
        )
    }
}

export default Input