const url = '//at.alicdn.com/t/font_1146631_bhm8rlon07v.css'

export default () => {
    const link = document.createElement('link')
    link.href = 'https:' + url
    link.rel = 'stylesheet'
    document.head.appendChild(link)
}