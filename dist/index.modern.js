import React, { useState, useEffect } from 'react';

var hashReader = function hashReader(str) {
  var _str$match, _str$match2;
  var patt1 = /[0-9]/g;
  var patt2 = /[a-zA-Z]/g;
  if (!str) return {
    numbers: '',
    letters: ''
  };
  var letters = (_str$match = str.match(patt2)) === null || _str$match === void 0 ? void 0 : _str$match.join('');
  var digits = (_str$match2 = str.match(patt1)) === null || _str$match2 === void 0 ? void 0 : _str$match2.join('');
  return {
    letters: letters,
    digits: digits
  };
};
var Router = function Router(_ref) {
  var path = _ref.path,
    hash = _ref.hash,
    children = _ref.children,
    onCallback = _ref.onCallback;
  var _useState = useState(window.location.pathname),
    currentPath = _useState[0],
    setCurrentPath = _useState[1];
  var _useState2 = useState(window.location.hash),
    currentHash = _useState2[0],
    setCurrentHash = _useState2[1];
  useEffect(function () {
    var onLocationChange = function onLocationChange() {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
      {
        onCallback ? onCallback() : null;
      }
    };
    var onHashChange = function onHashChange() {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
      {
        onCallback ? onCallback() : null;
      }
    };
    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onHashChange);
    return function () {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);
  if (currentHash) {
    var _hashReader = hashReader(currentHash),
      letters = _hashReader.letters;
    if (letters === hash) return children;else return React.createElement(React.Fragment, null);
  } else {
    return currentPath === path ? children : React.createElement(React.Fragment, null);
  }
};

var getRoutes = function getRoutes(routes) {
  return routes.map(function (prop, key) {
    return React.createElement(Router, {
      path: prop.path,
      hash: prop.hash,
      key: key,
      onCallback: prop.onCallback
    }, React.createElement(prop.component, null));
  });
};

var Link = function Link(_ref) {
  var className = _ref.className,
    href = _ref.href,
    children = _ref.children,
    onClick = _ref.onClick;
  function dispatchHashchange() {
    if (typeof HashChangeEvent !== 'undefined') {
      window.dispatchEvent(new HashChangeEvent('hashchange'));
      return;
    }
    try {
      window.dispatchEvent(new Event('hashchange'));
      return;
    } catch (error) {
      console.log(error);
    }
    var ieEvent = document.createEvent('Event');
    ieEvent.initEvent('hashchange', true, true);
    window.dispatchEvent(ieEvent);
  }
  var onClickLink = function onClickLink(event) {
    event.preventDefault();
    dispatchHashchange();
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    {
      onClick ? onClick() : null;
    }
    window.history.pushState({}, '', href);
    var navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };
  return React.createElement("a", {
    className: className,
    href: href,
    onClick: onClickLink
  }, children);
};

export { Link, Router, getRoutes };
//# sourceMappingURL=index.modern.js.map
