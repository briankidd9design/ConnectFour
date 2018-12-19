class Game {
	constructor() {
		this.board = new Board();
		this.players = this.createPlayers();
		this.ready = false;
	}
	/**
	 *
	 *@return {array} An array of two players
	 */
	createPlayers() {
		const players = [new Player('Player 1', 1, '#e15258', true),
			new Player('Player 2', 2, '#e59a13')
		];
		return players;
	}
	/*Returns Active Player @return {Object} player - The active player*/
	get activePlayer() {
		return this.players.find(player => player.active);
	}
	/** 
	 * Initializes game. 
	 */
	startGame() {
		/*Board.drawHTMLBoard();
		Token.drawHTMLToken();*/
		this.board.drawHTMLBoard();
		this.activePlayer.activeToken.drawHTMLToken();
		this.ready = true;
	}
	/**Branches code, depending on what key player presses
	 *@param {Object} e - Keydown event object	
	 **/
	handleKeydown(e) {
		if (this.ready) {
			if (e.key === "ArrowLeft") {
				//move left
				this.activePlayer.activeToken.moveLeft();
			} else if (e.key === "ArrowRight") {
				//move right
				this.activePlayer.activeToken.moveRight(this.board.cols);
			} else if (e.key === "ArrowDown") {
				//play token
				this.playToken();
			}
		}
	}
	/* Finds Space object to drop Token into, drops Token*/
	playToken() {
		let spaces = this.board.spaces;
		let activeToken = this.activePlayer.activeToken;
		let targetColumn = spaces[activeToken.columnLocation];
		let targetSpace = null;
		for (let space of targetColumn) {
			if (space.token === null) {
				targetSpace = space;
			}
		}
		if (targetSpace !== null) {
			const game = this;
			game.ready = false;
			activeToken.drop(targetSpace, function() {
				game.updateGameState(activeToken, targetSpace);
			});
		}
	}
	/**
	 *Switch Active Player
	 **/
	switchPlayers() {
		//let player = this.players;
		for (let player of this.players) {
			player.active = player.active === true ? false : true;
			/*if(player.active === true){
				return false;
			} else if (player.active === false){
				return true;
			}
		}*/
		}
	}
	/** 
	 * Checks if there a winner on the board after each token drop.
	 * @param   {Object}    Targeted space for dropped token.
	 * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
	 */
	checkForWin(target) {
		const owner = target.token.owner;
		let win = false;
		// vertical
		for (let x = 0; x < this.board.cols; x++) {
			for (let y = 0; y < this.board.rows - 3; y++) {
				if (this.board.spaces[x][y].owner === owner && this.board.spaces[x][y + 1].owner === owner && this.board.spaces[x][y + 2].owner === owner && this.board.spaces[x][y + 3].owner === owner) {
					win = true;
				}
			}
		}
		// horizontal
		for (let x = 0; x < this.board.cols - 3; x++) {
			for (let y = 0; y < this.board.rows; y++) {
				if (this.board.spaces[x][y].owner === owner && this.board.spaces[x + 1][y].owner === owner && this.board.spaces[x + 2][y].owner === owner && this.board.spaces[x + 3][y].owner === owner) {
					win = true;
				}
			}
		}
		// diagonal
		for (let x = 3; x < this.board.cols; x++) {
			for (let y = 0; y < this.board.rows - 3; y++) {
				if (this.board.spaces[x][y].owner === owner && this.board.spaces[x - 1][y + 1].owner === owner && this.board.spaces[x - 2][y + 2].owner === owner && this.board.spaces[x - 3][y + 3].owner === owner) {
					win = true;
				}
			}
		}
		// diagonal
		for (let x = 3; x < this.board.cols; x++) {
			for (let y = 3; y < this.board.rows; y++) {
				if (this.board.spaces[x][y].owner === owner && this.board.spaces[x - 1][y - 1].owner === owner && this.board.spaces[x - 2][y - 2].owner === owner && this.board.spaces[x - 3][y - 3].owner === owner) {
					win = true;
				}
			}
		}
		return win;
	}
	/** 
	 * Displays game over message.
	 * @param {string} message - Game over message.      
	 */
	gameOver(message) {
		document.getElementById("game-over").style.display = "block";
		document.getElementById("game-over").innerHTML = message;
	}
	/*Updates game state after token is dropped.
	 *@param {Object} token - The Token that's been dropped.
	 *@param {Object} target - Targeted space for dropped token
	 */
	updateGameState(token, target) {
		target.mark(token);
		if (!this.checkForWin(target)) {
			this.switchPlayers();
			if (this.activePlayer.checkTokens()) {
				this.activePlayer.activeToken.drawHTMLToken();
				this.ready = true;
			} else {
				this.gameOver('No more tokens');
			}
		} else {
			this.gameOver(`${target.owner.name} wins!`);
			let btn = document.createElement("Button");
			btn.setAttribute("id", "resetBtn");
			btn.innerHTML = "Reset";
			let br = "<br>";
			br
			document.getElementById("game-over").appendChild(btn).style.display = "block";
			document.getElementById("resetBtn").addEventListener('click', function() {
				window.location.reload();
				this.style.display = 'none';
				document.getElementById('play-area').style.opacity = '1';
			});
		
		}
	}
}