async function loadFeed() {

const url = document.getElementById("rssUrl").value;
const feedContainer = document.getElementById("feed");

if(url === ""){
feedContainer.innerHTML = "<p>Please enter an RSS Feed URL.</p>";
return;
}

feedContainer.innerHTML = "<p>Loading feed...</p>";

const proxy = "https://api.allorigins.win/raw?url=";

try {

const response = await fetch(proxy + encodeURIComponent(url));
const text = await response.text();

const parser = new DOMParser();
const xml = parser.parseFromString(text, "text/xml");

const items = xml.querySelectorAll("item");

let output = "";

items.forEach(item => {

const title = item.querySelector("title")?.textContent || "No title";
const description = item.querySelector("description")?.textContent || "No description";
const link = item.querySelector("link")?.textContent || "#";

output += `

<div class="item">
<h3>${title}</h3>
<p>${description.substring(0,150)}...</p>
<a href="${link}" target="_blank">Read Full Article</a>
</div>
`;

});

feedContainer.innerHTML = output;

} catch (error) {

feedContainer.innerHTML = "<p>Failed to load RSS feed. Please try another URL.</p>";

}

}
