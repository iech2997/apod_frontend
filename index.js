const apodContainer = document.getElementById("apod-container");
const loadMoreBtn = document.getElementById("load-more-btn");
const headerSearch = document.querySelector("#header-search");
let endDaysAgo = 0;
let startDaysAgo = 6;
let currentIndex = 0;
let apodDataArr = [];
const apodBaseUrl = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";


loadMoreBtn.addEventListener("click", FetchMoreApod);
headerSearch.addEventListener("keyup", Search);

GetApod(startDaysAgo, endDaysAgo);


async function GetApod(start, end) {
    // The fetch() method returns a Promise, which is a placeholder object that will either be "fulfilled" if your request is successful, 
    // or "rejected" if your request is unsuccessful.
    // If the Promise is fulfilled, it resolves to a Response object.
    // You can then handle the response by using methods like .json(), .text(), or .blob() on the response object to read the data
    // ** using async/await instead of .then() is preferred here 
    let apodUrl = `${apodBaseUrl}&start_date=${GetDateString(start)}&end_date=${GetDateString(end)}`;
    let apodRes = await fetch(apodUrl);

    // The data you get from a GET request is not usable at first. To make the data usable, you can use the .json() method on the Response object
    // Response.json() Returns a promise that is the result of taking JSON as input and parsing it to produce a JavaScript object.
    apodDataArr = await apodRes.json();
    apodDataArr.reverse();
    DisplayApod(apodDataArr);
}

function FetchMoreApod() {
    headerSearch.value = "";
    endDaysAgo += 7;
    startDaysAgo += 7;
    GetApod(startDaysAgo, endDaysAgo);
};

function DisplayApod(apodCollection) {
    // Destructuring parameters is a convenient way to extract values from objects and arrays directly within function parameters
    apodCollection.forEach(({copyright, date, explanation, title, url, media_type}) => {
        apodContainer.innerHTML += `<article id="apod-card-${currentIndex}" class="apod-card"></article>`;
        
        let apodCard = document.getElementById("apod-card-" + currentIndex);
        
        let mediaHtml = "";
        if (url)
        {
            if (media_type == "image") {
                mediaHtml = `<img class="apod-media" src="${url}">`;
            }
            else {
                mediaHtml = `<iframe class="apod-media" src="${url}"></iframe>`;
            }
        }

        let copyrightHtml = copyright ? `<p class="apod-copyright">${copyright}</p>` : "";
        let dateHtml = date ? `<p class="apod-date">${date}</p>` : "";
        let explanationHtml = explanation ? `<p class="apod-explanation">${explanation}</p>` : "";
        let titleHtml = title ? `<h2 class="apod-title">${title}</h2>` : "";

        apodCard.innerHTML += mediaHtml + titleHtml + copyrightHtml + dateHtml + explanationHtml;
        currentIndex++;
    });
}

function GetDateString(daysAgo) {
    let currentDatetime = new Date();
    currentDatetime.setDate(currentDatetime.getDate() - daysAgo);
    let year = currentDatetime.getFullYear();
    let month = currentDatetime.getMonth() + 1;
    let date = currentDatetime.getDate();
    return `${year}-${month}-${date}`;
}

function Search() {
    let allApodCard = document.querySelectorAll(".apod-card");
    let filter = headerSearch.value.toLowerCase();
    for (let i = 0; i < allApodCard.length; i++) {
        let title = allApodCard[i].querySelector(".apod-title").innerText.toLowerCase();
        if (title.indexOf(filter) === -1) {
            allApodCard[i].style.display = "none";
        }
        else {
            allApodCard[i].style.display = "";
        }
    }
}
