//create game object
const game = {};

//create a counter variable to track successful hit
let counter = 0;

// method to show finger
game.showFinger = (obj, time) => {
	console.log(obj);
	obj.addClass('up');
	console.log(`finger${obj[0]} shows for ${time} seconds`);
	//finger escapes after random seconds without being hit
	setTimeout(() => {
		obj.removeClass('up');
	}, time * 2);
};

//method for finger escaping
game.escape = obj => {
	obj.removeClass('up');
	// setTimeout(game.showFinger(object), randomTime);
	// console.log(`after ${time},finger ${obj} escaped`);
};

//event listener for fingers on click
$('.hole').on('click', '.finger', function() {
	$(this).removeClass('up');
	counter++;
	//update counter span content
	$('.counter').html(counter);
	console.log('you clicked ');
});

game.init = setInterval(function() {
	//show a random number of fingers each time (1 - 3)
	const numShowed = Math.ceil(Math.random() * 3);

	//an array of index to represent each finger
	const indexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];

	//create a for loop to iterate through the fingers being shown
	for (let i = 0; i < numShowed; i++) {
		//choose a random hole index from indexArray
		const randomTime = Math.round(Math.random() * 500 + 800);
		const randomIndex = Math.floor(Math.random() * indexArray.length);
		//splice the randomIndex from indexArray, and use .eq() to select the corresponding finger image as an object
		const $fingerObject = $(`.finger`).eq(indexArray.splice(randomIndex, 1));
		//check if fingerObject is display:none, call showFinger()
		if (!$fingerObject.is('.up')) {
			game.showFinger($fingerObject, randomTime);
		}
	}
	console.log('initiated');
}, Math.round(Math.random() + 800));

$(document).ready(function() {
	//document ready
	console.log('doc ready');
	game.init;
});
