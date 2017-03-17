//debug URL: chrome-extension://hnajbpkopgmkoaebdhallmmkdmanbilo/options.html
let data;
// Saves options to chrome.storage.sync.
function save_options() {
    const channelName = document.getElementById('channel').value;
    const tag = document.getElementById('tags').value;


    data.keep.push({
        channel: channelName,
        tag: tag
    });


    chrome.storage.sync.set(data, () => {
    // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
    restore_options();
}


function restore_options() {
    chrome.storage.sync.get({
        keep: []
    }, items => {
        data = items;
        document.getElementById('keepTags').innerHTML = JSON.stringify(data.keep);
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('add').addEventListener('click', save_options);
document.getElementById('clear').addEventListener('click', () => {
    chrome.storage.sync.clear();
    restore_options();
});