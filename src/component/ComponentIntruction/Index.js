import React from 'react'
import './index.css'

export default (({ intrudction: { detail, apis } }) => (
    <div className='TW_UI_componentDetail'>
        <div className='TW_UI_componentDetailTop'>
            <div>{detail}</div>
        </div>
        {
            apis && apis.values && apis.values.length !== 0 &&
            <div className='TW_UI_componentApi'>
                <p className='TW_UI_title'>{apis && apis.title}</p>
                <div className='TW_UI_apiContainer'>
                    <div className='TW_UI_apiHeaher'>
                        <div>属性</div>
                        <div>说明</div>
                        <div>类型</div>
                        <div>默认值</div>
                    </div>
                    {
                        apis.values.map(item => (
                            <div className='TW_UI_apiItem' key={item.property}>
                                <div>{item.property}</div>
                                <div>{item.summary}</div>
                                <div className='TW_UI_apiType'>{item._type_}</div>
                                <div className='TW_UI_apiDefaultValue'>{item.defaultValue}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        }
    </div>
))