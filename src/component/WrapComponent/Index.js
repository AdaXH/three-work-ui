import ReactDOM from 'react-dom';

export const mountComponent = (component, id = 'TW_UI_common') => {
    const parent = document.getElementById('__wrapComponent__' + id)
    if (parent) {
        const div = document.createElement('div')
        parent.appendChild(div)
    }
    if (!parent || !parent.children || !parent.children[0]) {
        const __wrapComponent__ = document.createElement('span')
        const div = document.createElement('div')
        __wrapComponent__.appendChild(div)
        __wrapComponent__.id = '__wrapComponent__' + id
        document.getElementsByTagName('body')[0].appendChild(__wrapComponent__)
    }
    const mountNode = document.getElementById('__wrapComponent__' + id)
    ReactDOM.render(typeof (component) === 'function' ? component() : component, mountNode.children[mountNode.children.length - 1])
}

export const unMountContainer = container => container.parentNode.remove()