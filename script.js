//create game object
const game = {};
//create a counter variable to track successful hit
let counter = 0;

//show a random number of fingers each time (1 - 3)
let fingerNum = Math.ceil(Math.random() * 3);

//create random number between 0 - 8
const randomIndex = Math.floor(Math.random() * 9);

//method to show finger
game.showFinger = () => {
	$(`.finger${randomIndex}`).addClass('showFinger');
	console.log('a finger shows');
};

//event listener for fingers on click
$('.hole').on('click', '.finger', function() {
	$(this).removeClass('showFinger');
	counter++;
	$('.counter').html(counter);
});

$(document).ready(function() {
	//document ready
	console.log('doc ready');
	game.showFinger();

	console.log('spawned');
	setTimeout(escape(), 5000);
	console.log('cleaned');
});
