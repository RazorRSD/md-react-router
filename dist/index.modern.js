import React, { useState, useEffect } from 'react';

const hashReader = str => {
  var _str$match, _str$match2;
  const patt1 = /[0-9]/g;
  const patt2 = /[a-zA-Z]/g;
  if (!str) return {
    numbers: '',
    letters: ''
  };
  const letters = (_str$match = str.match(patt2)) === null || _str$match === void 0 ? void 0 : _str$match.join('');
  const digits = (_str$match2 = str.match(patt1)) === null || _str$match2 === void 0 ? void 0 : _str$match2.join('');
  return {
    letters,
    digits
  };
};
const Router = ({
  path,
  hash,
  children,
  onCallback
}) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
      {
        onCallback ? onCallback() : null;
      }
    };
    const onHashChange = () => {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
      {
        onCallback ? onCallback() : null;
      }
    };
    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);
  if (currentHash) {
    const {
      letters
    } = hashReader(currentHash);
    if (letters === hash) return children;else return null;
  } else {
    return currentPath === path ? children : null;
  }
};

const getRoutes = (routes, notFound) => {
  const notFoundComp = () => {
    return notFound ? notFound : React.createElement("div", null, "404");
  };
  return routes.map((prop, key) => {
    return Router ? React.createElement(Router, {
      path: prop.path,
      hash: prop.hash,
      key: key,
      onCallback: prop.onCallback
    }, React.createElement(prop.component, null)) : notFoundComp;
  });
};

const Link = ({
  className,
  href,
  children,
  onClick
}) => {
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
    const ieEvent = document.createEvent('Event');
    ieEvent.initEvent('hashchange', true, true);
    window.dispatchEvent(ieEvent);
  }
  const onClickLink = event => {
    event.preventDefault();
    dispatchHashchange();
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    {
      onClick ? onClick() : null;
    }
    window.history.pushState({}, '', href);
    const navEvent = new PopStateEvent('popstate');
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
