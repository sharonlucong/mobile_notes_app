angular.module('NoteApp')
    .factory('NoteService', ['$localStorage', function($localStorage) {

        var addNote = function(note) {
        	$localStorage.notes.push(note);
        };

        var updateNote = function(idx, note) {
            $localStorage.notes[idx] = note;
        };

        var getNotes = function() {
        	if(!$localStorage.notes){
        		$localStorage.notes = [];
        	}
            return $localStorage.notes;
        };

        return {
            add: addNote,
            update: updateNote,
            getAll: getNotes
        }
    }]);
