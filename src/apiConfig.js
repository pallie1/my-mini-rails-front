let apiUrl;

const apiUrls = {
    development: `http://localhost:3000/playlists`,
    production: 'https://tunr-app-api.herokuapp.com/playlists'
};

if (window.location.hostname === 'localhost') {
    apiUrl = apiUrls.development;
} else {
    apiUrl = apiUrls.production;
}

export default apiUrl;