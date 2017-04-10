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
        //data saved
    });
    restore_options();
}
function update_tag_table() {
    //document.getElementById('keepTags').innerHTML = JSON.stringify(data.keep);
    const tableBody = document.querySelectorAll('#all-tags tbody')[0];
    tableBody.innerHTML = '';
    for (tag of data.keep) {
        const tr = document.createElement('tr');
        const markup = `
            <td>
                ${tag.channel}
            </td>
            <td>
                ${tag.tag}
            </td>
        `;
        tr.innerHTML = markup;
        tableBody.appendChild(tr);
    }
}

function restore_options() {
    chrome.storage.sync.get({
        keep: []
    }, items => {
        data = items;
        update_tag_table();
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('add').addEventListener('click', save_options);
document.getElementById('clear').addEventListener('click', () => {
    chrome.storage.sync.clear();
    restore_options();
});