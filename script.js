const apikey = "250590768e64489787483c2aff0463b1";
const blogcontainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
    try {
        const apiurl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiurl);  
        const data = await response.json();  
        console.log("Fetched Articles:", data.articles);  
        return data.articles;
    } catch (error) {
        console.error("Error Fetching random news", error);
        return [];
    }
}


searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();  
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);  
            displayBlogs(articles);
        } catch (error) {
            console.log("Error Fetching search news", error);
        }
    }
});

async function fetchNewsQuery(query) {
    try {
        const apiurl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`;  
        const response = await fetch(apiurl);  
        const data = await response.json();  
        console.log(data);
        return data.articles;
    } catch (error) {
        console.error("Error Fetching search news", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogcontainer.innerHTML = "";  
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        
        if (article.urlToImage) {
            const img = document.createElement("img");
            img.src = article.urlToImage;
            img.alt = article.title;
            blogCard.appendChild(img);
        }

        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "...." : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        const truncatedDescription = article.description.length > 120 ? article.description.slice(0, 120) + "...." : article.description;
        description.textContent = truncatedDescription;

        blogCard.appendChild(title);
        blogCard.appendChild(description);

        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });

        blogcontainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();
