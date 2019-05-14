import * as React from 'react'
import * as PropTypes from 'prop-types'

import './index.css'

export interface SelectProps {
    options?: Array<{ label: string | number, value: any, disabled?: boolean } | string>,
    onChange?: (value: any) => void,
    defaultValue?: string,
    value?: any,
    style?: React.CSSProperties,
    current?: boolean,
    width?: number | string,
    placeholder?: string,
    disabled?: boolean,
    size?: 'small' | 'default' | 'large',
    mutiple?: boolean
}

export interface SelectState {
    value: any,
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
        const value = props.value || props.defaultValue || undefined
        const extendsOptions = props.options ? props.options : ['option1', 'option2', 'option3']
        const options = reMapOptions(extendsOptions, value)
        this.state = {
            value: value ? (props.mutiple ? (value instanceof Array ? value : [value]) : value) : undefined,
            options,
            visible: false
        }
    }

    selectOption!: HTMLDivElement

    static propTypes = {
        options: PropTypes.array.isRequired,
        size: PropTypes.oneOf(['small', 'default', 'large']),
        disabled: PropTypes.bool,
        mutiple: PropTypes.bool
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

    toggleVisible = (visible: boolean, e: React.FocusEvent<HTMLDivElement>) => {
        e.stopPropagation && e.stopPropagation()
        visible === false && this.setState({ visible })
    }

    setValue = (value: any, disabled: boolean, e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation && e.stopPropagation()
        if (disabled || value === this.state.value || this.state.value && this.state.value.includes(value)) return
        const { options } = this.state
        const { mutiple } = this.props
        for (let item of options)
            item.current = item.value === value
        this.setState({ value: mutiple ? (this.state.value instanceof Array ? [...this.state.value, value] : [value]) : value, options: [...options] }, () => {
            !mutiple && this.selectOption.blur()
            this.props.onChange && this.props.onChange(this.state.value)
        })
    }

    handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation && e.stopPropagation()
        const { visible } = this.state
        this.setState({ visible: !visible })
        if (visible) this.selectOption.blur()
    }

    deleteItem = (e: React.MouseEvent<HTMLSpanElement>, currentValue: any) => {
        e.stopPropagation && e.stopPropagation()
        const { value } = this.state
        const { onChange } = this.props
        let deleteIndex = -1
        for (let i = 0; i < value.length; i++)
            if (value[i] === currentValue) {
                deleteIndex = i
                break
            }
        value.length === 1 ? this.setState({ value: undefined }) :
            value instanceof Array && deleteIndex !== -1 && value.splice(deleteIndex, 1) && this.setState({ value: [...value] })
        onChange && onChange(this.state.value || [])
    }

    renderOptions = () => {
        const { value, visible, options } = this.state
        const mapValueToLabel = (value: any) => {
            if (options)
                for (let item of options)
                    if (item.value === value) return item.label
            return ''
        }
        const { style = {}, width, placeholder, disabled = false, size = 'default', mutiple = false } = this.props
        let widthValue = width ? (typeof width === 'number' ? width + 'px' : width) : '100%'
        const needPlaceHolder = placeholder && (!value || (value.length && value.length === 0))

        return (
            <div className='TW_UI_selectWrap' style={{ height: `${size === 'small' ? '27px' : (size === 'default' ? '32px' : '35px')}` }}>
                <div className={`${mutiple && 'TW_UI_selectContainerMutiple'} TW_UI_selectContainer ${disabled ? 'TW_UI_selectdisabled' : 'TW_UI_selectDefault'} TW_UI_selectSize_${size}`}
                    style={{ width: widthValue, ...style }}
                    onClick={e => !disabled && this.handleClick(e)} tabIndex={1}
                    ref={(selectOption: HTMLDivElement) => this.selectOption = selectOption}
                    onFocus={(e) => !disabled && this.toggleVisible(true, e)}
                    onBlur={e => !disabled && this.toggleVisible(false, e)}>
                    <span className='TW_UI_selectValue'>
                        {
                            (!!value && mutiple) ? value instanceof Array && value.length !== 0 && value.map(item => (
                                <div className='TW_UI_selectMutipleItem' key={item} onClick={e => e.stopPropagation()}>
                                    <span onClick={e => e.stopPropagation()}>{mapValueToLabel(item)}</span>
                                    <span className='TW_UI_selectMutipleDelete' onClick={e => this.deleteItem(e, item)}><i className='iconfont icon-quxiao'></i></span>
                                </div>
                            ))
                                :
                                mapValueToLabel(value)
                        }
                        {
                            needPlaceHolder && <div className='TW_UI_selectPlaceholder'>{placeholder}</div>
                        }
                    </span>
                    <div className='TW_UI_selectionApi' />
                    {
                        visible && <div className='TW_UI_selectOptionsContainer' style={{ width: widthValue, ...style }}>
                            {
                                options && options.map(item => (
                                    <div
                                        onClick={(e) => this.setValue(item.value, item.disabled || false, e)}
                                        className={`TW_UI_optionItem 
                                            ${(item.current || mutiple && (value && value.includes(item.value))) ? 'TW_UI_optionItemCurrent' : 'TW_UI_optionItemDefault'} 
                                            ${item.disabled ? 'TW_UI_optionItemDisabled' : 'TW_UI_optionItemDefault'}`
                                        }
                                        key={item.value}>{item.label}</div>
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