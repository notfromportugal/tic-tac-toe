angular
	.module('ticTacToeApp')
	.controller('GameController', GameController);

	GameController.$inject = ['$firebaseObject', '$scope'];

function GameController($firebaseObject, $scope){

	var ref = new Firebase('https://dazzling-heat-8209.firebaseio.com');

	$firebaseObject(ref).$bindTo($scope, "game");
	

    $scope.playerMove = function(location) {
		//switches player 1 turn on and off to rotate turns
    	//square must have no content to be played
    	//assigns value of 1 or -1 for playerOne and Two
		if ($scope.game.playerOneTurn && $scope.game.gameBoard[location].cellContent === " ") {
			$scope.game.gameBoard[location].cellValue = $scope.game.playerOne;
			$scope.game.gameBoard[location].cellContent = "X"
			$scope.game.playerOneTurn = false;
		} else if ($scope.game.gameBoard[location].cellContent === " "){
			$scope.game.gameBoard[location].cellValue = $scope.game.playerTwo;
			$scope.game.gameBoard[location].cellContent = "O"
			$scope.game.playerOneTurn = true;
		}
		$scope.game.winner = getWinner();
	 }

	$scope.clearBoard = function() {
	 	// when the button is clicked, the cell values reset to 0, content to empty, and playerOneTurn resets to true.
	 	for (var i = 0; i < 9; i++) {
            $scope.game.gameBoard[i].cellContent = " ";
            $scope.game.gameBoard[i].cellValue = 0;
        }
        $scope.game.playerOneTurn = true;
        $scope.game.winner = 0;
	}

	$scope.resetScore = function() {
		//resets win totals to 0 when clicked
		$scope.game.playerOneWinTotal = 0;
		$scope.game.playerTwoWinTotal = 0;
	}

	function getWinner() {
		//checks each winning combo against winningTrio
		var board = $scope.game.gameBoard;
		var winner = 0;
		winner = winningTrio(board[0].cellValue, board[1].cellValue, board[2].cellValue);
		if (winner) return winner;
		winner = winningTrio(board[3].cellValue, board[4].cellValue, board[5].cellValue);
		if (winner) return winner;
		winner = winningTrio(board[6].cellValue, board[7].cellValue, board[8].cellValue);
		if (winner) return winner;
		winner = winningTrio(board[0].cellValue, board[3].cellValue, board[6].cellValue);
		if (winner) return winner;
		winner = winningTrio(board[1].cellValue, board[4].cellValue, board[7].cellValue);
		if (winner) return winner;
		winner = winningTrio(board[2].cellValue, board[5].cellValue, board[8].cellValue);
		if (winner) return winner;
		winner = winningTrio(board[6].cellValue, board[4].cellValue, board[2].cellValue);
		if (winner) return winner;
		winner = winningTrio(board[0].cellValue, board[4].cellValue, board[8].cellValue);
		if (winner) return winner;
		return 0;
	}

	function winningTrio(box1, box2, box3) {
		//checks if absolute value of any getWinner combos is 3, and returns a winner value if so
    	if (Math.abs(box1 + box2 + box3) === 3) {
        	if (box1 === 1) {
        		$scope.game.playerOneWinTotal++;
            	return 1;
        	} else if (box1 === -1) {
            	$scope.game.playerTwoWinTotal++;
            	return -1;
        	}
    	}	
	}
}

