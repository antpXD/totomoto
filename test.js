const TorrentSearchApi = require("torrent-search-api");

TorrentSearchApi.enableProvider("ThePirateBay");

// Search '1080' in 'Movies' category and limit to 20 results
const torrents = TorrentSearchApi.search("the invisible", "All", 2);

torrents.then(data => console.log(data)).catch(error => console.log(error));
