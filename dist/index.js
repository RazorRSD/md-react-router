function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

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
  return React__default.createElement("a", {
    className: className,
    href: href,
    onClick: onClickLink
  }, children);
};

var ctx = {
  query: {}
};
var reset = function reset() {
  ctx.query = {};
};

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
var comparePaths = function comparePaths(path, dynamicPath) {
  var pathSplit = path.split('/');
  var dynamicPathSplit = dynamicPath.split('/');
  if (pathSplit.length !== dynamicPathSplit.length) return false;
  var isMatch = true;
  pathSplit.forEach(function (item, index) {
    var _dynamicPathSplit$ind;
    if (item !== dynamicPathSplit[index] && !((_dynamicPathSplit$ind = dynamicPathSplit[index]) !== null && _dynamicPathSplit$ind !== void 0 && _dynamicPathSplit$ind.includes(':'))) {
      isMatch = false;
    }
  });
  if (isMatch) {
    dynamicPathSplit.map(function (item, index) {
      if (item.includes(':')) {
        var key = item.replace(':', '');
        ctx.query[key] = pathSplit[index];
        console.log('ctx', ctx);
      }
    });
  }
  return isMatch;
};
var Router = function Router(Routes, NotFound) {
  var _useState = React.useState(window.location.pathname),
    currentPath = _useState[0],
    setCurrentPath = _useState[1];
  var _useState2 = React.useState(window.location.hash),
    currentHash = _useState2[0],
    setCurrentHash = _useState2[1];
  var getCorrect = function getCorrect(path) {
    var _hashReader = hashReader(currentHash),
      letters = _hashReader.letters,
      digits = _hashReader.digits;
    if (letters && digits) {
      var correchash = Routes.find(function (item) {
        return item.hash === letters;
      });
      return (correchash === null || correchash === void 0 ? void 0 : correchash.children) || NotFound;
    }
    var dynamicPath = Routes.filter(function (item) {
      var _item$path;
      return (_item$path = item.path) === null || _item$path === void 0 ? void 0 : _item$path.includes(':');
    });
    var testChil = dynamicPath.map(function (item) {
      if (comparePaths(path, item.path || '')) {
        return item.children;
      }
      return null;
    });
    var finChil = testChil.filter(function (item) {
      return item;
    });
    if (finChil.length > 0) {
      return finChil[0];
    }
    var correct = Routes.find(function (item) {
      return item.path === path;
    });
    return (correct === null || correct === void 0 ? void 0 : correct.children) || NotFound;
  };
  React.useEffect(function () {
    var onLocationChange = function onLocationChange() {
      reset();
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
    };
    var onHashChange = function onHashChange() {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onHashChange);
    return function () {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);
  return getCorrect(currentPath);
};

exports.Link = Link;
exports.Router = Router;
exports.ctx = ctx;
//# sourceMappingURL=index.js.map
