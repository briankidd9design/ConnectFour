/*This is the interaction layer where the DOM meets the objects*/
/** 
 * Listens for click on `#begin-game` and calls startGame() on game object
 */
const game = new Game();
//$("#begin-game").click( Game.startGame() );
document.getElementById("begin-game").addEventListener( 'click', function() { 

		game.startGame();

		this.style.display = 'none';
		document.getElementById('play-area').style.opacity = '1';

});

/** 
 * Listen for keyboard presses
 */

 /**
 * Branches code, depending on what key player presses
 * @param   {Object}    e - Keydown event object
 */

document.addEventListener('keydown', function(event){
	game.handleKeydown(event);
    //console.log(event.key); //outputs a string naming the pressed key 
});