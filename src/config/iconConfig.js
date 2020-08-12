const url = '//at.alicdn.com/t/font_1146631_2i11x2hx8ii.css';

export default () => {
  const link = document.createElement('link');
  link.href = 'https:' + url;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};
