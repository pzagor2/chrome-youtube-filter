console.log('Start Youtube Filter EXT');
//Helper functions
function getDataFromGridItem(item) {
	const user = item.querySelector('a.g-hovercard').innerText;
	const title = item.querySelector('.yt-lockup-title').querySelector('a').innerText;

	const data = {
		user: user,
		title: title,
		dom: item
	};
	return data;
}

//Get all item into data array
const DOMItems = document.querySelectorAll('.yt-shelf-grid-item');
const data = [...DOMItems].map(item => {
	return getDataFromGridItem(item);
});
//Filter out NBA items
const onlyNba = data.filter(item => {
	if (item.user === 'NBA') {
		return true;
	}
	return false;
});
//Keep only title with TOP
const notTOP = onlyNba.filter(item => {
	var upperTitle = item.title.toUpperCase();
	return !upperTitle.includes('TOP');
});

for(item of notTOP) {
	item.dom.style.display = 'none';
}
