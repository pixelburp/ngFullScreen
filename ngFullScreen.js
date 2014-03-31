'use strict';

angular.module('myApp')
  .directive('ngFullScreen', function ($timeout, $window, preferences) {
    var win = $($window),
        isChrome = /chrome/.test(preferences.userAgent),
        isDroid = preferences.isDroid(),
        isNotDroid40 = !preferences.isDroid('4.0'),
        isNotIos7 = !preferences.isIos(7),
        heights = {};

    var getScreen = function() {
      var dimension = getOrientation() === 'portrait' ? 'height' : 'width';
      return $window.screen[dimension] / getPixelRatio();
    };

    var getOrientation = function() {
      return $window.orientation % 180 === 0 ? 'portrait' : 'landscape';
    };

    var getPixelRatio = function() {
      if(isDroid && !isChrome) {
        return $window.devicePixelRatio || 1;
      } else {
        return 1;
      }
    };

    return function(scope, element) {

      scope.scrollToTop = function() {
        $window.scrollTo(0, 1);
      };

      scope.setFullScreen = function() {
        element.css('height', getScreen());
        $timeout(function() {
          scope.setHeight();
          scope.scrollToTop();
        }, 50, false);
      };

      scope.setHeight = function() {
        var orientation = getOrientation(),
            suffix = orientation === 'landscape' && isDroid ? 'Width' : 'Height',
            winHeight = $window[ (isDroid ? 'outer' : 'inner') + suffix ];

        if(!heights[orientation]) {
          heights[orientation] = winHeight / getPixelRatio();
        }
        element.css('height', heights[orientation]);
      };

      scope.init = function() {
        scope.setFullScreen();

        win.on('orientationchange', function() {
          scope.setFullScreen();
          scope.scrollToTop();
        });

        win.on('touchmove', function(e) {
          e.preventDefault();
        });

        element.on('touchstart', function() {
          scope.scrollToTop();
        });
      };
      // As you cant hide addressBar in iOS7 (yet), dont bother with directive.
      if(isNotIos7 && isNotDroid40) {
        scope.init();
      }

    };
  });
