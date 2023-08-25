const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`

async function fetchNews() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.articles) {
            displayNews(data.articles);
        } else {
            console.error('No articles found in the response');
        }
    } catch (error) {
        console.error('There was an error!', error);
    }
}

function displayNews(articles) {
    const newsList = document.getElementById('news');

    // Clear out any old news articles
    newsList.innerHTML = '';

    articles.forEach(article => {
        const listItem = document.createElement('li');

        // If you want more details (like the description or an image), you can add them here
        listItem.textContent = article.title;

        newsList.appendChild(listItem);
    });
}

fetchNews();
