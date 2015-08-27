angular.module('NoteApp')
    .factory('LoginService', ['$localStorage', function($localStorage) {

        var setLogStatus = function(state){
            $localStorage.logged = state;
        }

        var getLogStatus = function(){
            if(!$localStorage.logged){
                $localStorage.logged = false;
            }

            return $localStorage.logged;
        }

        return {
            set: setLogStatus,
            get: getLogStatus
        }
    }]);
