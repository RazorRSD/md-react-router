import React, { useState, useEffect } from 'react';

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

const ctx = {
  query: {}
};
const reset = () => {
  ctx.query = {};
};

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
const comparePaths = (path, dynamicPath) => {
  const pathSplit = path.split('/');
  const dynamicPathSplit = dynamicPath.split('/');
  if (pathSplit.length !== dynamicPathSplit.length) return false;
  let isMatch = true;
  pathSplit.forEach((item, index) => {
    var _dynamicPathSplit$ind;
    if (item !== dynamicPathSplit[index] && !((_dynamicPathSplit$ind = dynamicPathSplit[index]) !== null && _dynamicPathSplit$ind !== void 0 && _dynamicPathSplit$ind.includes(':'))) {
      isMatch = false;
    }
  });
  if (isMatch) {
    dynamicPathSplit.map((item, index) => {
      if (item.includes(':')) {
        const key = item.replace(':', '');
        ctx.query[key] = pathSplit[index];
        console.log('ctx', ctx);
      }
    });
  }
  return isMatch;
};
const Router = (Routes, NotFound) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const getCorrect = path => {
    const {
      letters,
      digits
    } = hashReader(currentHash);
    if (letters && digits) {
      const correchash = Routes.find(item => item.hash === letters);
      return (correchash === null || correchash === void 0 ? void 0 : correchash.children) || NotFound;
    }
    const dynamicPath = Routes.filter(item => {
      var _item$path;
      return (_item$path = item.path) === null || _item$path === void 0 ? void 0 : _item$path.includes(':');
    });
    const testChil = dynamicPath.map(item => {
      if (comparePaths(path, item.path || '')) {
        return item.children;
      }
      return null;
    });
    const finChil = testChil.filter(item => item);
    if (finChil.length > 0) {
      return finChil[0];
    }
    const correct = Routes.find(item => item.path === path);
    return (correct === null || correct === void 0 ? void 0 : correct.children) || NotFound;
  };
  useEffect(() => {
    const onLocationChange = () => {
      reset();
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
    };
    const onHashChange = () => {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onHashChange);
    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);
  return getCorrect(currentPath);
};

export { Link, Router, ctx };
//# sourceMappingURL=index.modern.js.map
