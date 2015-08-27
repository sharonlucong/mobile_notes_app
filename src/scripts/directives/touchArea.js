angular.module('NoteApp')
    .directive('toucharea', ['$touch', '$rootScope', '$parse', '$timeout', function($touch, $rootScope, $parse, $timeout) {
        // Runs during compile
        return {
            restrict: 'AC',
            link: function(scope, elem, attrs) {
                scope.touch = null;
                var openNote = false;
                var showInfoFn = $parse(attrs.toucharea);
                $touch.bind(elem, {
                    start: function(touch) {
                        scope.touch = touch;
                        openNote = true;
                        scope.$apply();
                    },

                    move: function(touch) {
                        openNote = false;
                    },

                    end: function(touch) {
                        if (openNote) {
                            $timeout(function() {
                                scope.$apply(function() {
                                    showInfoFn(scope);
                                });
                            }, 300);
                            $rootScope.Ui.turnOn('noteModal');
                        }
                    }
                });
            }
        };
    }]);
