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

chrome.storage.sync.get({
  keep: []
}, storedData => {

  //Get all item into data array
  const DOMItems = document.querySelectorAll('.yt-shelf-grid-item');
  const data = [...DOMItems].map(item => {
    return getDataFromGridItem(item);
  });
  storedData.keep.forEach(sotedItem => {

    //Filter out NBA items
    const onlyTitle = data.filter(item => {
      if (item.user === sotedItem.channel) {
        return true;
      }
      return false;
    });

    //Keep only title with TOP
    const notTOP = onlyTitle.filter(item => {
      const upperTitle = item.title.toUpperCase();
      return !upperTitle.includes(sotedItem.tag.toUpperCase());
    });

    for(item of notTOP) {
      item.dom.style.display = 'none';
    }

  });
});




