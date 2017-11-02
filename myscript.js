console.log('Start Youtube Filter EXT');
//Helper functions
function getDataFromGridItem(item) {
    const user = item.querySelector('.yt-lockup-byline a').innerText;
    const title = item.querySelector('.yt-lockup-title a').innerText;

    const data = {
        user: user,
        title: title,
        dom: item
    };
    return data;
}

chrome.storage.sync.get({
    keep: []
}, storedData => {

    //Get all item into data array
    const DOMItems = document.querySelectorAll('.yt-shelf-grid-item');
    const data = [...DOMItems].map(item => {
        return getDataFromGridItem(item);
    });
    storedData.keep.forEach(sortedItem => {

        //Filter out NBA items
        const onlyTitle = data.filter(item => {
            if (item.user === sortedItem.channel) {
                return true;
            }
            return false;
        });

        //Keep only title with TOP
        const notTOP = onlyTitle.filter(item => {
            const upperTitle = item.title.toUpperCase();
            return !upperTitle.includes(sortedItem.tag.toUpperCase());
        });

        for(const item of notTOP) {
            item.dom.style.display = 'none';
        }

    });
});




