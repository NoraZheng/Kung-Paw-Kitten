//create game object
const game = {};

//create a counter variable to track successful hit
let counter = 0;

// method to show finger
game.showFinger = (obj, time) => {
	obj.addClass('up');

	//finger escapes after random seconds without being hit
	setTimeout(() => {
		game.escape(obj);
	}, time + 500);
};

//method for finger escaping
game.escape = obj => {
	obj.removeClass('up');
};

game.hit = () => {};

game.init = function() {
	//show a random number of fingers each time (1 - 3)
	const numShowed = Math.ceil(Math.random() * 3);

	//an array of index to represent each finger
	const indexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	//create a for loop to iterate through the fingers being shown
	for (let i = 0; i < numShowed; i++) {
		//generate a random period of time between 1-1.5s
		const randomTime = Math.round(Math.random() * 500 + 1000);

		//choose a random hole index from indexArray
		const randomIndex = Math.floor(Math.random() * indexArray.length);

		//splice the randomIndex from indexArray, and use .eq() to select the corresponding finger image as an object
		const $finger = $(`.finger`).eq(indexArray.splice(randomIndex, 1));

		// if $finger is currently hidden, call showFinger()
		if (!$finger.is('.up')) {
			game.showFinger($finger, randomTime);
		}
	}
};

$(document).ready(function() {
	//document ready
	$('.start').on('click', function() {
		console.log('started');
		//run game.init around every 0.5s - 1s
		setInterval(game.init, Math.round(Math.random() * 500) + 500);
	});
	//event listener for fingers on click
	$('.hole').on('click', '.finger', function() {
		$(this).addClass('hit');
		counter++;
		//update counter span content
		$('.counter').html(counter);
	});
});
