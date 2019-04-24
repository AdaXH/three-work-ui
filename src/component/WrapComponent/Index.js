import ReactDOM from 'react-dom';

export const mountComponent = (component, id = 'TW_UI_common') => {
    const parent = document.getElementById('__wrapComponent__' + id)
    if (!parent) {
        const __wrapComponent__ = document.createElement('div')
        __wrapComponent__.id = '__wrapComponent__' + id
        document.getElementsByTagName('body')[0].appendChild(__wrapComponent__)
    }
    ReactDOM.render(typeof (component) === 'function' ? component() : component, document.getElementById('__wrapComponent__' + id))

}