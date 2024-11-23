import { Octokit } from "https://esm.sh/@octokit/core";


const octokit = new Octokit({
    auth: 'DEMO'
});
const githubOwner = "iech2997";
const githubRepo = "apod_frontend";


const apodContainer = document.getElementById("apod-container");
const loadMoreBtn = document.getElementById("load-more-btn");
const headerSearch = document.querySelector("#header-search");
const githubCommit = document.querySelector("#commit-btn");
const githubCommitNumber = document.querySelector("#commit-number");
let endDaysAgo = 0;
let startDaysAgo = 8;
let currentIndex = 0;
let apodDataArr = [];
const apodBaseUrl = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";


loadMoreBtn.addEventListener("click", FetchMoreApod);
headerSearch.addEventListener("keyup", Search);
githubCommit.addEventListener("click", updateCommit);

GetApod(startDaysAgo, endDaysAgo);

updateCommit();


async function updateCommit() {
    githubCommitNumber.innerText = await getGithubCommit();
}

async function getGithubCommit() {   
    return 10;

    let commitRes = await octokit.request('GET /repos/{owner}/{repo}/commits', {
        owner: githubOwner,
        repo: githubRepo,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    
    return commitRes["data"].length;
}

async function GetApod(start, end) {
    // The fetch() method returns a Promise, which is a placeholder object that will either be "fulfilled" if your request is successful, 
    // or "rejected" if your request is unsuccessful.
    // If the fetch() promise is fulfilled, it resolves to a Response object.
    // You can then handle the Response object by using methods like .json(), .text(), or .blob() on the response object to read the data
    // ** using async/await instead of .then() is preferred here 
    let apodUrl = `${apodBaseUrl}&start_date=${GetDateString(start)}&end_date=${GetDateString(end)}`;
    let apodRes = await fetch(apodUrl);

    // The data you get from a GET request is not usable at first. To make the data usable, you can use the Response object's .json() method
    // Response.json() returns a Promise that resolves to a JavaScript object.
    apodDataArr = await apodRes.json();
    apodDataArr.reverse();
    DisplayApod(apodDataArr);
}

function FetchMoreApod() {
    headerSearch.value = "";
    Search();
    endDaysAgo += 9;
    startDaysAgo += 9;
    GetApod(startDaysAgo, endDaysAgo);
};

function DisplayApod(apodCollection) {
    // Destructuring parameters is a convenient way to extract values from objects and arrays directly within function parameters
    apodCollection.forEach(({ copyright, date, explanation, title, url, media_type }) => {
        apodContainer.innerHTML += `<div class="apod-col col"><article id="apod-card-${currentIndex}" class="apod-card card h-100 text-bg-info"></article></div>`;

        let apodCard = document.getElementById("apod-card-" + currentIndex);

        let mediaHtml = "";
        if (url) {
            if (media_type == "image") {
                mediaHtml = `<img class="apod-media card-img-top" src="${url}">`;
            } else {
                mediaHtml = `<iframe class="apod-media card-img-top" src="${url}"></iframe>`;
            }
        }

        apodCard.innerHTML += mediaHtml;

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        let copyrightHtml = copyright ? `<p class="apod-copyright card-subtitle">${copyright}</p>` : "";
        let dateHtml = date ? `<p class="apod-date card-subtitle">${date}</p>` : "";
        let explanationHtml = explanation ? `<p class="apod-explanation card-text text-truncate">${explanation}</p>` : "";
        let titleHtml = title ? `<h2 class="apod-title card-title">${title}</h2>` : "";

        cardBody.innerHTML += titleHtml + copyrightHtml + dateHtml + explanationHtml;
        apodCard.appendChild(cardBody);

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
    let allApodCard = document.querySelectorAll(".apod-col");
    let filter = headerSearch.value.toLowerCase();
    for (let i = 0; i < allApodCard.length; i++) {
        let title = allApodCard[i].querySelector(".apod-title").innerText.toLowerCase();
        if (title.indexOf(filter) === -1) {
            allApodCard[i].style.display = "none";
        } else {
            allApodCard[i].style.display = "";
        }
    }
}
