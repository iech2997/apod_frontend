const apodContainer = document.getElementById("apod-container");
const loadMoreBtn = document.getElementById("load-more-btn");
let startingIndex = 0;
let endingIndex = 7;
let apodDataArr = [];
const apodBaseUrl = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";

async function GetApod() {
    // The fetch() method returns a Promise, which is a placeholder object that will either be "fulfilled" if your request is successful, 
    // or "rejected" if your request is unsuccessful.
    // If the Promise is fulfilled, it resolves to a Response object.
    // You can then handle the response by using methods like .json(), .text(), or .blob() on the response object to read the data
    // ** using async/await instead of .then() is preferred here 
    let apodUrl = `${apodBaseUrl}&start_date=${GetDateString(13)}`;
    let apodRes = await fetch(apodUrl);

    // The data you get from a GET request is not usable at first. To make the data usable, you can use the .json() method on the Response object
    // Response.json() Returns a promise that is the result of taking JSON as input and parsing it to produce a JavaScript object.
    apodDataArr = await apodRes.json();
    apodDataArr.reverse();
    DisplayApod(apodDataArr.slice(startingIndex, endingIndex));
}

function FetchMoreApod() {
    startingIndex += 7;
    endingIndex += 7;
    DisplayApod(apodDataArr.slice(startingIndex, endingIndex));
    if (apodDataArr.length <= endingIndex) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = "No more data to load";
    }
};

function DisplayApod(apodCollection) {
    // Destructuring parameters is a convenient way to extract values from objects and arrays directly within function parameters
    apodCollection.forEach(({copyright, date, explanation, title, url}, index) => {
        apodContainer.innerHTML += `
            <div id="${index}" class="apod-card">
                <img class=""apod-img" src="${url}" alt="${title} image">
                <h2 class="apod-title">${title}</h2>
                <p class="apod-copyright">${copyright}</p>
                <p class="apod-date">${date}</p>
                <p class="apod-explanation">${explanation}</p>
            </div>
        `;
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

loadMoreBtn.addEventListener("click", FetchMoreApod);

GetApod();
