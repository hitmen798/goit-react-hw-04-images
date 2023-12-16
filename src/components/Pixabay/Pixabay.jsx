export const BASE_URL = 'https://pixabay.com/api/',
            API_KEY = '38792772-96055b8d813e0fe5e4d1964ec',
            SEARCH_PARAMS = new URLSearchParams({
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                per_page: 12,
            });