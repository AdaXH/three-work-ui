const url = '//at.alicdn.com/t/font_1146631_hgkx3d5c9hb.css'


export default () => {
    const link = document.createElement('link')
    link.href = 'https:' + url
    link.rel = 'stylesheet'
    document.head.appendChild(link)
}