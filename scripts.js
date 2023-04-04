// const homepage = '/holbertonschool-smiling-school-javascript/homepage.html';
// const pricing = '/holbertonschool-smiling-school-javascript/pricing.html';
// const courses = '/holbertonschool-smiling-school-javascript/courses.html';

$(document).ready(function() {
  // if (window.location.pathname === homepage) {
		// console.log(window.location.pathname);
    generate_quotes();
    generate_popular();
    generate_latest();
  // }
  // if (window.location.pathname === pricing) {
  //   generate_quotes();
  // }
  // if (window.location.pathname === courses) {
    
  // }
});

// QUOTES/TESTIMONIALS CAROUSEL
function generate_quotes() {
	$.ajax({
		url: 'https://smileschool-api.hbtn.info/quotes',
		method: 'GET',
		success: function(data) {
			console.log('AJAX success'); // AJAX success
			console.log(data); // (2) [{...}, {...}]
			const quotes = data[0];
			console.log(`Quotes: ${quotes}`); // Quotes: [object Object]
			const carousel = $('#testimonial');
			console.log(`Carousel: ${carousel}`); // Quotes: [object Object]

			// loop through each quote and create a carousel item
			data.forEach(function createCard(quote, index) {
				console.log(quote);
				const item = $('<div>').addClass('carousel-item px-5');
				const helper = $('<div>').addClass('d-flex flex-column align-items-center flex-sm-row col-sm-10 carousel-helper m-md-5');
				const avatar = $('<img>').addClass('rounded-circle carousel-avatar').attr('src', quote['pic_url']).attr('width', '210px');
				console.log(quote['pic_url'])
				const content = $('<div>').addClass('px-sm-5');
				const text = $('<p>').addClass('px-2 mt-4 mt-md-0').text(quote['text']);
				console.log(quote['text']);
				const name = $('<p>').addClass('font-weight-bold pl-2 pt-2 mb-1 align-self-start').text(quote['name']);
				const occupation = $('<cite>').addClass('pl-2 align-self-start').text(quote['title']);

				// add content to carousel item
				content.append(text, name, occupation);
				helper.append(avatar, content);
				item.append(helper);
				carousel.append(item);

				// set first carousel item as active
				if (index === 0) {
					item.addClass('active');
					console.log('active');
				}
			});

			// remove loader and show carousel
			$('#testimonialLoader').remove();
			$('.testimonialCarousel').removeClass('d-none');
		},
		error: function() {
			// handle error
			console.log('Error fetching quotes');
		}
	});
}

// POPULAR TUTORIALS CAROUSEL
function generate_popular() {
	$.ajax({
		url: 'https://smileschool-api.hbtn.info/popular-tutorials',
		type: 'GET',
		success: function(data) {
			let cards = '';
			data.forEach((item, index) => {
				$('#popular-card').append(`
					<div class="h-100 col-12 col-sm-6 col-md-4">
						<div class="card border-0 d-flex flex-column">
							<img src="${item.thumb_url}" class="card-img-top" alt="${item.title}">
							<div class="card-body">
								<h5 class="card-title">${item.title}</h5>
								<h6>${item['sub-title']}</h6>
								
									<div class="row">
										<img src="${item.author_pic_url}" alt="tiny profile" style="height: 20px;" class="mx-3 rounded-circle">
										<h6 class="purple">${item.author}</h6>
									</div>
									<di class="row mx-0">
									${(function fun() {
										let stars = '';
										for (let i = 1; i <= 5; i++)
										{
											if (i < item.star) {
												stars += `<img src="./images/star_on.png" height="15px" width="15px">`
											} else {
												stars += `<img src="./images/star_off.png" height="15px" width="15px">`
											}
										}
										return stars;
									})
									()}
									<p class='ml-auto purple'>${item.duration}</p>
							
							</div>
						</div>
					</div>
					`);
			});
			$('#popular-card').slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2
						}
					},
					{
						breakpoint: 576,
						settings: {
							slidesToShow: 1
						}
					}
				]
			});
			// set the initial height of the cards after they have been added to the page
			setCardHeight();

			// remove loader and show carousel
			$('#popular-loader').remove();
			$('.testimonialCarousel').removeClass('d-none');
		}
	});
}

// LATEST VIDEOS CAROUSEL
function generate_latest() {
	$.ajax({
		url: 'https://smileschool-api.hbtn.info/latest-videos',
		type: 'GET',
		success: function(data) {
			let cards = '';
			data.forEach((item, index) => {
				$('#latest-card').append(`
					<div class="h-100 col-12 col-sm-6 col-md-4">
						<div class="card border-0 d-flex flex-column">
							<img src="${item.thumb_url}" class="card-img-top" alt="${item.title}">
							<div class="card-body">
								<h5 class="card-title">${item.title}</h5>
								<h6>${item['sub-title']}</h6>
								
									<div class="row">
										<img src="${item.author_pic_url}" alt="tiny profile" style="height: 20px;" class="mx-3 rounded-circle">
										<h6 class="purple">${item.author}</h6>
									</div>
									<di class="row mx-0">
									${(function fun() {
										let stars = '';
										for (let i = 1; i <= 5; i++)
										{
											if (i < item.star) {
												stars += `<img src="./images/star_on.png" height="15px" width="15px">`
											} else {
												stars += `<img src="./images/star_off.png" height="15px" width="15px">`
											}
										}
										return stars;
									})
									()}
									<p class='ml-auto purple'>${item.duration}</p>
							
							</div>
						</div>
					</div>
					`);
			});
			$('#latest-card').slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2
						}
					},
					{
						breakpoint: 576,
						settings: {
							slidesToShow: 1
						}
					}
				]
			});
			// set the initial height of the cards after they have been added to the page
			setCardHeight();

			// remove loader and show carousel
			$('#latest-loader').remove();
			$('.testimonialCarousel').removeClass('d-none');
		}
	});
}
// function to set the height of all cards to match the height of the tallest card
function setCardHeight() {
	// reset the height of all cards to their initial value
	$('.card').height('auto');

	let maxHeight = 0;
	$('.card').each(function() {
		if ($(this).height() > maxHeight) {
			maxHeight = $(this).height();
		}
	});
	$('.card').height(maxHeight);
}

// DROPDOWN LIST OF COURSES
$.ajax({
	url: "https://smileschool-api.hbtn.info/courses",
	type: "GET",
	success: function (response) {
		const topics = response.topics;
		const sorts = response.sorts;
		const courses = response.courses;

		// loop through topics
		topics.forEach(topic => {
			// console.log(topic);
			$('#topicDropDown').append(
				`<li class="dropdown-item">
					<a href="#" class="text-dark" style="text-decoration: none;">
						${toStandardString(topic)}
					</a>
				</li>`
			);
		});

		// loop through sorts
		sorts.forEach(sort => {
			// console.log(topic);
			$('#sorts').append(
				`<li class="dropdown-item">
					<a href="#" class="text-dark" style="text-decoration: none;">
						${toStandardString(sort)}
					</a>
				</li>`
			);
		});

		loadVideos(courses);
	},
	error: function (xhr) {
		console.log(xhr.responseText);
	}
});
// snake to standard string
function toStandardString(snakeCaseString) {
	let words = snakeCaseString.split('_');
	for (let i = 0; i < words.length; i++) {
		words[i] = words[i][0].toUpperCase() + words[i].substr(1);
	}
	return words.join(' ');
}

// star rating function
function stars(rating) {
	let stars = '';
	for (let i = 1; i <= 5; i++) {
		if (i < rating) {
			stars += `<img src="./images/star_on.png" height="15px" width="15px">`
		} else {
			stars += `<img src="./images/star_off.png" height="15px" width="15px">`
		}
	}
	return stars;
}

// load videos function
function loadVideos(courses) {
	// loop through courses
	courses.forEach(video => {
		// console.log(course);
		$('#courseVideos').append(
			`<div class="col-12 col-sm-4 col-md-3 my-3">
				<div>
					<img class="card-img-top" src="${video.thumb_url}" alt="">
					<img class="card-img-overlay play mx-auto mt-1 p-0 w-50" src="images/play.png">
				</div>
				<div class="card-body">
					<h1 class="card-title lead font-weight-bold text-dark">${video.title}</h1>
					<p class="card-text text-secondary">${video['sub-title']}</p>
					<div class="row">
						<img class="rounded-circle ml-3" src="${video['author_pic_url']}" height="25px" width="25px"
							alt="">
						<p class="ml-3 purple">${video.author}</p>
					</div>
					<div class="row align-items-center justify-content-between px-4">
						<div class="row">
							${stars(video.star)}
						</div>
						<p class="purple ml-3 pt-3">${video.duration}</p>
					</div>
				</div>
			</div>
			`
		)
	});
}
