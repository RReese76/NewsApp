const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

const currentDateElement = document.getElementById('current-date');
const currentDate = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
currentDateElement.textContent = currentDate.toLocaleDateString('en-US', options);

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

    newsList.innerHTML = '';

    articles.forEach(article => {
        const listItem = document.createElement('li');
        listItem.classList.add('news-item');

        const image = document.createElement('img');
        image.classList.add('news-image');
        image.src = article.urlToImage || 'placeholder-image.jpg';

        const textContainer = document.createElement('div');
        textContainer.classList.add('news-text');
        textContainer.innerHTML = `<h3><a href="${article.url}" target="_blank">${article.title}</a></h3><p>${article.description}</p>`;

        listItem.appendChild(image);
        listItem.appendChild(textContainer);

        newsList.appendChild(listItem);
    });
}

fetchNews();
