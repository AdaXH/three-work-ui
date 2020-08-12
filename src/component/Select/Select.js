import React, { useRef } from 'react';
import { useSetState } from 'react-use';
import { reMapOptions, mapValueToLabel } from './util';
import './index.less';

export default props => {
  const {
    size = 'default',
    mutiple = false,
    disabled = false,
    width,
    style = {},
    options: propdOpts,
    placeholder,
    onChange: propsOnChange,
  } = props;
  let widthValue = width
    ? typeof width === 'number'
      ? width + 'px'
      : width
    : '100%';
  const [state, setState] = useSetState(() => {
    const value = props.value || props.defaultValue || undefined;
    return {
      value: value
        ? props.mutiple
          ? value instanceof Array
            ? value
            : [value]
          : value
        : undefined,
      options: reMapOptions(propdOpts, value),
      visible: false,
    };
  });
  const refForWidth = useRef({});
  const selectOption = useRef({});
  const { visible, value, options } = state;
  const needPlaceHolder =
    placeholder && (!value || (value.length && value.length === 0));
  const initWidth = refForWidth.current && refForWidth.current.offsetWidth;
  const setValue = async (val, disabled, e) => {
    e.stopPropagation && e.stopPropagation();
    if (disabled || val === value || (value && value.includes(val))) return;
    for (let item of options) item.current = item.value === val;
    await setState({
      value: mutiple ? (value instanceof Array ? [...value, val] : [val]) : val,
      options: [...options],
    });
    if (!mutiple) selectOption.current.blur();
    propsOnChange && propsOnChange(value);
  };
  const toggleVisible = (vis, e) => {
    e.stopPropagation && e.stopPropagation();
    vis === false && setState({ visible: vis });
  };
  const handleClick = e => {
    e.stopPropagation && e.stopPropagation();
    setState({ visible: !visible });
    if (visible) selectOption.blur();
  };
  const deleteItem = (e, currentValue) => {
    e.stopPropagation && e.stopPropagation();
    let deleteIndex = -1;
    for (let i = 0; i < value.length; i++)
      if (value[i] === currentValue) {
        deleteIndex = i;
        break;
      }
    value.length === 1
      ? setState({
          value: undefined,
        })
      : value instanceof Array &&
        deleteIndex !== -1 &&
        value.splice(deleteIndex, 1) &&
        setState({ value: [...value] });
    propsOnChange && propsOnChange(currentValue || []);
  };
  return (
    <div
      className="TW_UI_selectWrap"
      style={{
        height: `${
          size === 'small' ? '27px' : size === 'default' ? '32px' : '35px'
        }`,
      }}
      ref={refForWidth}
    >
      <div
        className={`${mutiple &&
          'TW_UI_selectContainerMutiple'} TW_UI_selectContainer ${
          disabled ? 'TW_UI_selectdisabled' : 'TW_UI_selectDefault'
        } TW_UI_selectSize_${size}`}
        style={{ width: widthValue, ...style }}
        onClick={e => !disabled && handleClick(e)}
        tabIndex={1}
        ref={selectOption}
        onFocus={e => !disabled && toggleVisible(true, e)}
        onBlur={e => !disabled && toggleVisible(false, e)}
      >
        <span className="TW_UI_selectValue">
          {!!value && mutiple
            ? value instanceof Array &&
              value.length !== 0 &&
              value.map(item => (
                <div
                  className="TW_UI_selectMutipleItem"
                  key={item}
                  onClick={e => e.stopPropagation()}
                >
                  <span onClick={e => e.stopPropagation()}>
                    {mapValueToLabel(options, item)}
                  </span>
                  <span
                    className="TW_UI_selectMutipleDelete"
                    onClick={e => deleteItem(e, item)}
                  >
                    <i className="iconfont icon-quxiao" />
                  </span>
                </div>
              ))
            : mapValueToLabel(options, value)}
          {needPlaceHolder && (
            <div className="TW_UI_selectPlaceholder">{placeholder}</div>
          )}
        </span>
        <div className="TW_UI_selectionApi" />
        {visible && (
          <div
            className="TW_UI_selectOptionsContainer"
            style={{ ...style, width: initWidth + 20 + 'px' }}
          >
            {options &&
              options.map(item => (
                <div
                  onClick={e => setValue(item.value, item.disabled || false, e)}
                  className={`TW_UI_optionItem ${
                    item.current ||
                    (mutiple && (value && value.includes(item.value)))
                      ? 'TW_UI_optionItemCurrent'
                      : 'TW_UI_optionItemDefault'
                  } ${
                    item.disabled
                      ? 'TW_UI_optionItemDisabled'
                      : 'TW_UI_optionItemDefault'
                  }`}
                  key={item.value}
                >
                  {item.label}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
