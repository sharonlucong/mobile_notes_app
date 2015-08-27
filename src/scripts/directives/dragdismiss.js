angular.module('NoteApp')
    .directive('dragToDismiss', ['$drag', '$parse', '$timeout', function($drag, $parse, $timeout) {
        return {
            restrict: 'A',
            compile: function(elem, attrs) {
                var dismissFn = $parse(attrs.dragToDismiss);
                return function(scope, elem) {
                    var dismiss = false;

                    $drag.bind(elem, {
                        transform: $drag.TRANSLATE_RIGHT,
                        move: function(drag) {
                            if(elem.hasClass('dismitted')){
                                elem.removeClass('dismitted');
                            }
                            if (drag.distanceX >= drag.rect.width / 4) {
                                dismiss = true;
                                elem.addClass('dismiss');
                            } else {
                                dismiss = false;
                                elem.removeClass('dismiss');
                            }
                        },
                        cancel: function() {
                            elem.removeClass('dismiss');
                        },
                        end: function(drag) {
                            if (dismiss) {
                                $timeout(function() {
                                    scope.$apply(function() {
                                        dismissFn(scope);
                                        elem.addClass('dismitted');
                                    });
                                }, 300);
                            } else {
                                drag.reset();
                            }
                        }
                    });
                };
            }
        };
    }]);
