'use strict';
angular.module('myApp')
.service('preferences', function($window) {
  return {
    slideSpeed: 250,
    userAgent: $window.navigator.userAgent.toLowerCase(),
    isTouchDevice: !!('ontouchend' in $window),
    isWebkit3DEnabled: ('WebKitCSSMatrix' in $window && 'm11' in new WebKitCSSMatrix()),
    animationEnd: 'animationName' in document.documentElement.style ? 'animationend' : 'webkitAnimationEnd',
    bindings: function() {
      return {
        down: this.isTouchDevice ? 'touchstart' : 'mousedown',
        move: this.isTouchDevice ? 'touchmove' : 'mousemove',
        up: this.isTouchDevice ? 'touchend' : 'mouseup'
      }
    },

    has3d: function() {
      // Firefox has transform3d support too, so just pass in this context...
      // Older Androids support 3d, but not transform3d / rotate3d, unhelpfully.
      var isLegacyDroid = /android 2.3/.test(this.userAgent),
          isFirefox = /firefox/.test(this.userAgent);
      return !isLegacyDroid && (isFirefox || this.isWebkit3DEnabled) ? 'has_3d' : 'no_3d';
    },
    isIos: function(version) {
      var regex = new RegExp('(?:i(?:pad|phone|pod)(?:.*)cpu(?: iphone)? os )([^\\s;]+)'),
          match = this.userAgent.match(regex),
          iosVersion, parts;
      if(!match) {
        return false;
      }
      iosVersion = String(match[match.length - 1]).toLowerCase().replace(/_/g, '.').replace(/[\-+]/g, '');
      parts = iosVersion.split('.');
      return Number(parts[0]) === version;
    },
    isDroid: function(version) {
      version = version || '';
      var parts = version.split('|'),
          regexString = '',
          i = 0,
          partsLength = parts.length;

      if(partsLength <= 1) {
        regexString = 'android ' + version;
      } else {
        for(i; i < partsLength; i+=1) {
          regexString += (i === 0 ? '' : '|') + 'android ' + parts[i];
        }
      }

      return new RegExp(regexString).test(this.userAgent);
    },
    isDesktop: function() {
      return !(/iphone|ipad|ipod/.test(this.userAgent)) && !this.isDroid();
    }
  }
});
