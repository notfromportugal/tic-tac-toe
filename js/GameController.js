angular
	.module('ticTacToeApp')
	.controller('GameController', GameController);

	GameController.$inject = ['$firebaseObject', '$scope'];

	function GameController($firebaseObject, $scope){

	var ref = new Firebase('https://dazzling-heat-8209.firebaseio.com');
	
	$firebaseObject(ref).$bindTo($scope, "game");

	var playerOne = 1
	var playerTwo = -1

	$scope.gameBoard = [
		
		{cell: null}, 
		{cell: null}, 
		{cell: null}, 
		{cell: null}, 
		{cell: null}, 
		{cell: null}, 
		{cell: null}, 
		{cell: null}, 
		{cell: null}
	];


function winningTrio(box1, box2, box3) {
    if (Math.abs(box1 + box2 + box3) === 3) {
        if (box1 === 1) {
            return "Player One Wins!"
        } else {
            return "Player Two Wins!"
        }
    }
}

	}

