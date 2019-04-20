const url = '//at.alicdn.com/t/font_1146631_wlig4mk8l4.css'


export default () => {
    const link = document.createElement('link')
    link.href = 'https:' + url
    link.rel = 'stylesheet'
    document.head.appendChild(link)
}