import { useState, useEffect } from 'react';
const useShowClass = (anmClass, duration = 200) => {
  const [show, setShow] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(anmClass);
    }, duration);

    return () => clearTimeout(timeout);
  }, [show, anmClass]);

  return [show, setShow];
};
export default useShowClass;
export function setDynamicColor(color) {
  document.documentElement.style.setProperty('--dynamic-color', color);
}

let styleSheet = null;

export function addDynamicColorClass(color, className) {
  if (!styleSheet) {
    styleSheet = document.createElement('style');
    document.head.appendChild(styleSheet);
  }
  const css = `.${className} { color: ${color}; }`;
  styleSheet.sheet.insertRule(css, styleSheet.sheet.cssRules.length);
  return className;
}
