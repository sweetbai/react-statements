import React from 'react';
import PropTypes from 'prop-types';
import Default from './Default';
import { isObject } from './utils';

class For extends React.Component {
  render() {
    const { children, of } = this.props;
    let renderMethod = null;
    let defaultComponent = null;
    let renderItems = null;
    if (!React.Children.count(children)) {
      renderMethod = children;
    } else {
      children.forEach((child) => {
        if (child.type === Default) {
          defaultComponent = child;
        } else if (typeof child === 'function') {
          renderMethod = child;
        }
      });
    }
    if (Array.isArray(of)) {
      const items = [...of];
      renderItems = items.map((item, index) => renderMethod(item, index));
    } else if (isObject(of)) {
      const items = { ...of };
      const keys = Object.keys(items);
      renderItems = keys.map((key, index) => renderMethod(items[key], index, key));
    }
    if (renderItems && renderItems.length) {
      return renderItems;
    } else if (defaultComponent) {
      return React.cloneElement(defaultComponent);
    }
    return null;
  }
}
For.propTypes = {
  of: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};
export default For;
