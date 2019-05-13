import * as React from 'react'
import * as PropTypes from 'prop-types'

import './index.css'

export interface SelectProps {
    options?: Array<{ label: string | number, value: any, disabled?: boolean } | string>,
    onChange?: (value: any) => void,
    defaultValue?: string,
    value?: string,
    style?: React.CSSProperties,
    current?: boolean,
    width?: number | string,
    placeholder?: string
}

export interface SelectState {
    value?: any,
    options: Array<{ label: string | number, value: any, disabled?: boolean, current?: boolean }>,
    visible: boolean
}

const reMapOptions = (arr: Array<{ label: string | number, value: any, disabled?: boolean, current?: boolean } | string>, value: any) => {
    const options = arr.map(item => {
        const current = value === (item instanceof Object ? item.value : item)
        return item instanceof Object ? { ...item, current } : { label: item, value: item, current, disabled: false }
    })
    return options
}

class Select extends React.Component<SelectProps, SelectState> {

    constructor(props: SelectProps) {
        super(props)
        const value = props.value || props.defaultValue || ''
        const extendsOptions = props.options ? props.options : ['option1', 'option2', 'option3']
        const options = reMapOptions(extendsOptions, value)
        this.state = {
            value,
            options,
            visible: false
        }
    }

    selectOption!: HTMLDivElement

    static propTypes = {
        options: PropTypes.array.isRequired
    }

    static defaultProps: SelectProps = {
        onChange: (value: any) => console.log(value)
    }

    static getDerivedStateFromProps(nextProps: SelectProps, preState: SelectState) {
        if ('options' in nextProps && nextProps.options && nextProps.options.length !== 0 && JSON.stringify(nextProps.options) !== JSON.stringify(preState.options))
            return {
                ...preState,
                options: reMapOptions(nextProps.options, nextProps.value || preState.value)
            }
        if ('value' in nextProps && nextProps.value !== preState.value)
            return {
                ...preState,
                value: nextProps.value
            }
        return null
    }

    toggleVisible = (visible: boolean) => this.setState({ visible })

    setValue = (value: any, disabled: boolean) => {
        if (disabled) return
        const { options } = this.state
        for (let item of options)
            item.current = item.value === value
        this.setState({ value, options: [...options] }, () => {
            this.selectOption.blur()
            this.props.onChange && this.props.onChange(value)
        })
    }

    renderOptions = () => {
        const { value, visible, options } = this.state
        const mapValueToLabel = (value: any) => {
            if (options)
                for (let item of options)
                    if (item.value === value) return item.label
            return ''
        }
        const { style = {}, width, placeholder, defaultValue } = this.props
        let widthValue = width ? (typeof width === 'number' ? width + 'px' : width) : '100%'
        const needPlaceHolder = placeholder && !this.props.value && !this.props.defaultValue && !value
        return (
            <div className='TW_UI_selectWrap' >
                <div className='TW_UI_selectContainer' style={{ width: widthValue, ...style }} tabIndex={1} ref={(selectOption: HTMLDivElement) => this.selectOption = selectOption} onFocus={() => this.toggleVisible(true)} onBlur={() => this.toggleVisible(false)}>
                    <span className='TW_UI_selectValue'>
                        {mapValueToLabel(value)}
                        {
                            needPlaceHolder && <div className='TW_UI_selectPlaceholder'>{placeholder}</div>
                        }
                    </span>
                    <div className='TW_UI_selectionApi' />
                    {
                        visible && <div className='TW_UI_selectOptionsContainer' style={{ width: widthValue, ...style }}>
                            {
                                options && options.map(item => (
                                    <div onClick={() => this.setValue(item.value, item.disabled || false)} className={`TW_UI_optionItem ${item.current ? 'TW_UI_optionItemCurrent' : 'TW_UI_optionItemDefault'} ${item.disabled ? 'TW_UI_optionItemDisabled' : 'TW_UI_optionItemDefault'}`} key={item.value}>{item.label}</div>
                                ))
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }

    render = () => this.renderOptions()
}

export default Select