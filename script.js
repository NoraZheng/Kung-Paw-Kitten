//create game object
const game = {};

//store the number of successful hit
game.counter = 0;

//set game state to be not running
game.isRunning = false;

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
game.fingerHit = obj => {
	//create a counter variable to track successful hit
	$(obj)
		.addClass('hit')
		.removeClass('up');
	game.counter++;
	//update score span content
	$('.counter').html(game.counter);
};

//method for keyboard accessibility
game.keyHit = key => {
	const fingerHit = $(`.finger[data-key="${key}"]`);
	if (fingerHit.is('.up')) {
		game.fingerHit(fingerHit);
	}
};

//method to set a timer that updates every second
game.timer = function() {
	let time = 15;
	$('.timer').html(time);
	setInterval(function() {
		if (time > 0) {
			time--;
			$('.timer').html(time);
		}
	}, 1000);
};
//method to end the game and clear setInterval
game.end = function(interval) {
	game.isRunning = false;
	$('.finger').removeClass('up');
	$('.scoreBoard').fadeIn();
	$('.start')
		.prop('disabled', false)
		.html('play again!');

	clearInterval(interval);
};

//make the cat paw follow cursor
game.movePaw = function() {
	$(document).on('mousemove', function(e) {
		$('.paw').css({
			left: e.pageX - 5,
			top: e.pageY - 12
		});
	});
};

//update cat paw CSS when mousedown
game.pawHit = () => {
	$(document).mousedown(() => {
		$('.paw').addClass('pawHit');
		setTimeout(() => {
			$('.paw').removeClass('pawHit');
		}, 300);
	});
};

//method to start one round of game
game.start = function() {
	//set the active element (tab focus) to <body> so keyboard users don't need to manually navigate to the game board
	document.activeElement.blur();

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
//method to initialize the app
game.init = function() {
	//show div.infoBox(how to play)
	$('.infoBox').fadeIn();

	//call cursor mouse events
	game.movePaw();
	game.pawHit();

	//event listener for keyboard access
	$(document).on('keydown', e => game.keyHit(e.originalEvent.key));

	//event listener for fingers on click
	$('.finger').on('click', function() {
		game.fingerHit($(this));
	});

	//event listener for button.start to start the game
	$('.start').on('click', function() {
		game.timer();
		$('.infoBox').fadeOut();
		$('.scoreBoard').fadeOut();
		game.isRunning = true;

		//disable the start button
		$(this).prop('disabled', true);

		//reset score
		game.counter = 0;
		$('.counter').html(game.counter);

		//a setInterval to run game.start every random 1s-1.5s
		const spawn = setInterval(
			game.start,
			Math.round(Math.random() * 1000) + 500
		);

		//game ends after 20 seconds
		setTimeout(function() {
			//pass in the id of the setInterval to clear it
			game.end(spawn);
		}, 15000);
	});
};

$(document).ready(function() {
	//document ready
	game.init();
}); //end of document ready
