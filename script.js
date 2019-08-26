//create game object
const game = {};

game.isRunning = false;
//create a counter variable to track successful hit
let counter = 0;

// method to show finger
game.showFinger = (obj, time) => {
	obj.addClass('up');

	//finger escapes after random seconds without being hit
	setTimeout(() => {
		game.escape(obj);
	}, time);
};

//method to hide unhit fingers
game.escape = obj => {
	obj.removeClass('up');
};

//method to update CSS and score when a finger is hit
game.hit = obj => {
	$(obj)
		.addClass('hit')
		.removeClass('up');
	counter++;
	//update score span content
	$('.counter').html(counter);
};

//method for keyboard accessibility
game.keyHit = key => {
	const fingerHit = $(`.finger[data-key="${key}"]`);
	if (fingerHit.is('.up')) {
		game.hit(fingerHit);
	}
};

//event listener for fingers on click
$('.finger').on('click', function() {
	game.hit($(this));
});

game.init = function() {
	//show a random number of fingers each time (1 - 3)
	const numShowed = Math.ceil(Math.random() * 3);

	//an array of index to represent each finger
	const indexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	//create a for loop to iterate through the fingers being shown
	for (let i = 0; i < numShowed; i++) {
		//generate a random period of time between 1s -1.5s
		const randomTime = Math.round(Math.random() * 500 + 1000);

		//choose a random hole index from indexArray
		const randomIndex = Math.floor(Math.random() * indexArray.length);

		//splice the randomIndex from indexArray, and use .eq() to select the corresponding finger image as an object
		const $finger = $(`.finger`).eq(indexArray.splice(randomIndex, 1));

		// if $finger is currently hidden, call showFinger()
		if (!$finger.is('.up') && game.isRunning) {
			$finger.removeClass('hit');
			game.showFinger($finger, randomTime);
		}
	}
};

$(document).ready(function() {
	//document ready

	//event listener for button.start to start the game
	$('.start').on('click', function() {
		game.isRunning = true;

		$(this).prop('disabled', true);
		//reset score
		counter = 0;
		$('.counter').html(counter);

		//game ends after 20 seconds
		setTimeout(() => {
			game.isRunning = false;
			alert(`Time up! Your score is ${counter}!`);
			$('.start').prop('disabled', false);
		}, 20000);

		//run game.init around every 1s - 1.5s
		setInterval(game.init, Math.round(Math.random() * 1000) + 500);
	});

	//turn on event listener for keyboard access
	$(document).on('keydown', e => game.keyHit(e.originalEvent.key));
}); //end of document ready
