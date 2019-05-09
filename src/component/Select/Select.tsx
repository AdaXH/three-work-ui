import * as React from 'react'
import * as PropTypes from 'prop-types'

import './index.css'

export interface SelectProps {
    options?: Array<{ label: string | number, value: any } | string>,
    onChange?: (value: any) => void,
    defaultValue?: string,
    value?: string | number
}

export interface SelectState extends SelectProps {
    value?: any
}

class Select extends React.Component<SelectProps, SelectState> {

    constructor(props: SelectProps) {
        super(props)
        const value = props.value ? props.value : (props.defaultValue || '')
        const options = props.options ? props.options : ['option1', 'option2', 'option3']
        this.state = {
            value,
            options
        }
    }

    selectOption!: HTMLDivElement

    static propTypes = {
        options: PropTypes.array.isRequired
    }

    static defaultProps: SelectProps = {

        onChange: (value: any) => console.log(value)
    }

    renderOptions = () => {
        const { value, options } = this.state
        const mapOptions = options && options.map(item => {
            const current = value === (item instanceof Object ? item.value : item)
            return item instanceof Object ? { ...item, current } : { label: item, value: item, current }
        })
        const mapValueToLabel = (value: any) => {
            if (mapOptions)
                for (let item of mapOptions)
                    if (item.value === value) return item.label
            return ''
        }
        console.log(this.selectOption)
        return (
            <div className='TW_UI_selectContainer' tabIndex={1} onFocus={() => console.log('focus')}>
                <span>{mapValueToLabel(value)}</span>
                <div className='TW_UI_selectionApi' />
                <div className='TW_UI_selectOptionsContainer' ref={(selectOption: HTMLDivElement) => this.selectOption = selectOption}>
                    {
                        mapOptions && mapOptions.map(item => (
                            <div className={`${item.current ? 'TW_UI_optionItemCurrent' : 'TW_UI_optionItemDefault'}`} key={item.value}>{item.label}</div>
                        ))
                    }
                </div>
            </div>
        )
    }

    render = () => this.renderOptions()
}

export default Select