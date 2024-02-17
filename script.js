const quote = document.getElementById("quote");
const quoteAuthor = document.getElementById("quote-author");
const loadingMessage = document.getElementById("loading");
const fetchButton = document.getElementById("fetch-button");


const API_URL = "https://api.quotable.io/random";

const showLoading = (isLoading) => {
    loadingMessage.style.display = isLoading ? "block" : "none";
}


const handleError = (error) => {
    quote.textContent = "An error occurred while fetching quote. Please try again later.";
}

const fetchData = () => {
    hideData();
    showLoading(true);

    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayData(data);
        })
        .catch(handleError)
        .finally(() => {
            showLoading(false);
        });
}


const displayData = (data) => {
    quote.textContent = data.content;
    quoteAuthor.textContent = `- ${data.author}`;
}

const hideData = () => {
    quote.textContent = "";
    quoteAuthor.textContent = "";
};

fetchData();


fetchButton.addEventListener("click", fetchData);
