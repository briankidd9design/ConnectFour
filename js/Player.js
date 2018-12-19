/*objects:*game, game board, player, space, token/

/* Game, Player, Token, Board, Space */

class Player{

	constructor(name, id, color, active = false){
		this.name = name;
		this.id = id;
		this.color = color;
		this.active = active;
		this.tokens = this.createTokens(21);
		/* Token object would have color, image shape, player token*/

	}


/**
*Creates token object for player
*@param {integer} num - Number of token object to be created
*/

	createTokens(num){

		const tokens = [];

		for (let i = 0; i < num; i++) {
			let token = new Token(i, this);
			tokens.push(token);
		}

		return tokens;
	}


		/**
		*Gets all tokens that haven't been dropped
		*@return{array} Array of Unused tokens
		*/

		get unusedTokens(){

			return this.tokens.filter(token => !token.dropped);

		}

		/**Gets the active token by returning the first token in the arry of unused tokens.
		*@return {Object} First token object in the array of unused tokens. 
		*/

		get activeToken() {
			return this.unusedTokens[0];
		}

		/**
		* Check if player has any undropped tokens left
		*@return {Boolean}
		*
		*/
		checkTokens() {
			return this.unusedTokens.length == 0 ? false : true;
		}


}