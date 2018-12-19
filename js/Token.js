class Token{

		constructor(index, owner) {
			this.owner = owner;
			this.id = `token-${index}-${owner.id}`;
			this.dropped = false;
			this.columnLocation = 0;

		}

		get htmlToken() {
		     /*Basically, it returns the Element of the token.
		     The instructor created 'div' element and stored it in 'const token'
		     This getter would return that specific 'div' element */
		     return document.getElementById(this.id);
		}



		/** 
 		* Gets left offset of html element.
 		* @return  {number}   Left offset of token object's htmlToken.
 		*/

 		get offsetLeft(){
 			return this.htmlToken.offsetLeft;
 		}

 		/* draws new HTML token */

		drawHTMLToken(){
				const token = document.createElement('div');
				document.getElementById('game-board-underlay').appendChild(token);
				token.setAttribute('id', this.id);
				token.setAttribute('class', 'token');
				token.style.backgroundColor = this.owner.color;

		}


 		/** 
		 * Moves html token one column to left.
 		*/
 		moveLeft(){
 			if (this.columnLocation > 0) {
 				this.htmlToken.style.left = this.offsetLeft - 76;
 				this.columnLocation -= 1;
 			}
 		}

 		/** 
		 * Moves html token one column to right.
 		* @param   {number}    columns - number of columns in the game board
 		*/

 		moveRight(cols){
 			if (this.columnLocation < cols -1) {
 				this.htmlToken.style.left = this.offsetLeft + 76;
 				this.columnLocation += 1;
 			}


 		}

 		/** 
 		* Drops html token into targeted board space.
	 	* @param   {Object}   target - Targeted space for dropped token.
 		* @param   {function} reset  - The reset function to call after the drop animation has completed.
 		*/
 		drop(target, reset){
 			this.dropped = true;

 			$(this.htmlToken).animate({
   			 top: (target.y * target.diameter)
			}, 750, 'easeOutBounce', reset);
 		}


}