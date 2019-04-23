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
                                <div className='TW_UI_apiContainer_'>
                                    <span>{item.property}</span>
                                </div>
                                <div className='TW_UI_apiContainer_ '>
                                    <span>{item.summary}</span>
                                </div>
                                <div className='TW_UI_apiType TW_UI_apiContainer_'>
                                    <span>{item._type_}</span>
                                </div>
                                <div className='TW_UI_apiDefaultValue TW_UI_apiContainer_'>
                                    <span>{item.defaultValue}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        }
    </div>
))