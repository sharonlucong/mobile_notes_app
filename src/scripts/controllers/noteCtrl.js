angular.module('NoteApp')
    .controller('NoteCtrl', function($scope, NoteService, $state, LoginService, $timeout) {
        var selected;

        $scope.$watchCollection('[$parent.loggedIn, notes.length]', function(newValues, oldValues, scope) {
            if (newValues[0] == false) {
                    $state.go('signIn');
                }
            if(newValues[1] >= 50){
                $scope.showLimitWarning = true;
                $timeout( function(){ $scope.showLimitWarning=false; }, 3000);
            }
        });

        $scope.notes = NoteService.getAll();
        $scope.focus = false;

        $scope.logout = function() {
            LoginService.set(false);
            $scope.$parent.loggedIn = LoginService.get();
            $scope.$parent.user = {
                username: "",
                password: ""
            };
            $state.go('signIn');
        }

        $scope.addNew = function(n) {
            NoteService.add(n);
        };

        $scope.update = function(n) {
            var index = $scope.notes.indexOf(n);
            $scope.notes[index] = $scope.newNote;
            NoteService.update(index, $scope.newNote);
        }

        $scope.addOrUpdate = function(n) {
            if (selected) {
                $scope.update(selected);
                selected = null;
            } else {
                $scope.addNew(n);
            }

        }

        $scope.remain = function() {
            var count = 0;
            angular.forEach($scope.notes, function(note) {
                count += note.done ? 0 : 1;
            });
            return count;
        };


        $scope.openNewModal = function() {
            $scope.newNote = {};
        }

        $scope.deleteNote = function(n) {
            var index = $scope.notes.indexOf(n);
            if (index > -1) {
                $scope.notes.splice(index, 1);
            }
        };

        $scope.showInfo = function(n) {
            selected = n;
            $scope.newNote = {};
            $scope.newNote.title = n.title;
            $scope.newNote.content = n.content;
            $scope.newNote.date = n.date;
        }

    });
