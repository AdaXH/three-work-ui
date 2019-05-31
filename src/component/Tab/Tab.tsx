/*
 * @Author: Ada 
 * @Date: 2019-05-21 17:04:05 
 * @Last Modified by: Ada - 向晗
 * @Last Modified time: 2019-05-30 17:57:37
 */
import * as React from 'react'
import Panel from './Panel'
import './index.css'

export interface TabProps {
    defaultActiveKey?: any,
    activeKey?: any,
    onChange?: (key: any) => void,
    tabs: Array<{ key: any, title: React.ReactNode, disabled: boolean, content: React.ReactNode }>
}

export interface TabState extends TabProps {
    activeKey?: any,
    currentTab: { width: string, index: number, left: string } | boolean
}

class Tab extends React.Component<TabProps, TabState> {
    constructor(props: TabProps) {
        super(props)
        const activeKey = props.activeKey || props.defaultActiveKey || undefined
        const { children } = this.props
        const tabs: Array<{ key: any, title: React.ReactNode, disabled: boolean, content: React.ReactNode }> = []
        children instanceof Array && children.forEach(item => {
            if (item && item instanceof Object && 'type' in item) {
                tabs.push({
                    key: item.key,
                    title: item.props.title || '',
                    disabled: item.props.disabled || false,
                    content: item.props.children
                })
            }
        })
        this.state = { activeKey, tabs, currentTab: false }
    }
    static Panel = Panel
    tabContainer!: HTMLDivElement | HTMLElement | null

    saveCurrentTab = (tabContainer: HTMLDivElement | HTMLElement | null) => {
        if (tabContainer) {
            for (let i = 0, len = tabContainer.children.length; i < len; i++) {
                let item: any = tabContainer.children[i]
                if (/TW_UI_tabCurrent_true/.test(item.className)) {
                    this.setState({
                        currentTab: { left: item.offsetLeft + 'px', width: item.clientWidth + 'px', index: Number(item.getAttribute('data-index')) || 0 }
                    })
                    break
                }
            }
        }
    }

    componentDidMount() {
        !!this.tabContainer && this.saveCurrentTab(this.tabContainer)
    }

    handleClickTab = (activeKey: any) => {
        this.props.onChange && this.props.onChange(activeKey)
        this.setState({ activeKey }, () => this.saveCurrentTab(this.tabContainer))
    }

    static getDerivedStateFromProps(nextProps: TabProps, preState: TabState) {
        if ('activeKey' in nextProps && preState.activeKey !== nextProps.activeKey)
            return { activeKey: nextProps.activeKey }
        return null
    }

    renderHeader = () => {
        const { tabs, activeKey, currentTab } = this.state
        let style = {}
        if (currentTab instanceof Object) {
            style = {
                transform: `translate3d(${currentTab.left}, 0, 0)`,
                width: currentTab.width
            }
        }
        return (
            <div className='TW_UI_tabHeaderContainer' ref={(ref: HTMLDivElement | HTMLElement | null) => this.tabContainer = ref}>
                {
                    tabs.length !== 0 && tabs.map((item, index) => (
                        <div onClick={() => !item.disabled && item.key !== activeKey && this.handleClickTab(item.key)} className={`TW_UI_tabItem TW_UI_tabCurrent_${item.key === activeKey} ${item.disabled ? 'TW_UI_tabItemDisabled' : 'TW_UI_tabItemDefault'}`} key={item.key} data-index={index}>{item.title}</div>
                    ))
                }
                <div className='TW_UI_tabAnchor' style={{ ...style }} />
            </div>)

    }

    rendderPanel = () => {
        const { tabs, currentTab } = this.state
        return <Tab.Panel tabs={tabs} activePanel={currentTab instanceof Object && currentTab.index} />
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.rendderPanel()}
            </div>
        )
    }
}

export default Tab