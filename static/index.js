// when the site loads
$(document).ready(function () {
	requestNewReviews(32); // get 32 new reviews as JSON
});

// send a request from client to server
function requestNewReviews(numberOfReviews) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			appendNewReviews(JSON.parse(xmlhttp.responseText));
		}
	};
	xmlhttp.open("GET","getfeed?n=" + numberOfReviews, true);
	xmlhttp.send();
}

// called when the request responds
function appendNewReviews(responseJSON) {
	var feed = document.getElementById("feed");
	var html = '';
	console.log(responseJSON);
	responseJSON.forEach(function (review) {
		html += `
			<div class='review section shadow-1'>
				<div class="section-content review-content">
					<div class='subject-group'>
						<div class="subjectPictureDiv">
							<img class='subjectPicture' src='${review.subject.image}'>
						</div>
						<div class='subjectName'>${review.subject.name}</div>
						<div class='subjectName'>${review.subject.artist}</div>
					</div>

					<div class="review-right">
						<div class="top-group">
							<a href='/user/${review.user.username}'><div class='Name'>${review.user.name}</div>
							<img class='userPicture' src='${review.user.image}'>
							<div class='userName'>${review.user.username}</div></a>
							<div class='rating'>${review.rating}</div>
						</div>
						<div class="text-group"
						<div class='text'>${review.text}</div>
						<div class='date'>${review.date}</div>
					</div>
				</div>
			</div>
		`;
	});
	feed.innerHTML += html;
}