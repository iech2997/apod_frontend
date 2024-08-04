async function get_major_apod() {
    let major_apod_url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";

    // The fetch() function returns a Promise which is fulfilled with a Response object representing the server's response.
    let major_apod_response = await fetch(major_apod_url);
    // Response.json() Returns a promise that is the result of taking JSON as input and parsing it to produce a JavaScript object.
    let major_apod_response_json = await major_apod_response.json();
    document.getElementById("major-date").innerHTML = "Today";
    if (major_apod_response_json.hasOwnProperty("title")) {
        document.getElementById("major-title").innerHTML = major_apod_response_json.title;
    }
    if (major_apod_response_json.hasOwnProperty("media_type") && major_apod_response_json.hasOwnProperty("url")){
        if (major_apod_response_json.media_type == "video") {
            document.getElementById("major-video").src = major_apod_response_json.url;
        }
        else if (major_apod_response_json.media_type == "image") {
            document.getElementById("major-picture").src = major_apod_response_json.url;
            const element = document.getElementById("major-video");
            element.remove();
        }
    }
    if (major_apod_response_json.hasOwnProperty("copyright")) {
        document.getElementById("major-copyright").innerHTML = major_apod_response_json.copyright;
    }
    if (major_apod_response_json.hasOwnProperty("explanation")) {
        document.getElementById("major-explanation").innerHTML = major_apod_response_json.explanation;
    }
    console.log(major_apod_response_json);
}

async function get_minor_apod() {
    let current_datetime = new Date();
    for (let i = 1; i <= 4; i++) {
        current_datetime.setDate(current_datetime.getDate() - 1);
        let year = current_datetime.getFullYear();
        let month = current_datetime.getMonth() + 1;
        let date = current_datetime.getDate();
        let minor_apod_url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY=" + year + "-" + month + "-" + date;
        let minor_apod_response = await fetch(minor_apod_url);
        let minor_apod_response_json = await minor_apod_response.json();
        if (minor_apod_response_json.hasOwnProperty("date")) {
            document.getElementById("minor" + i + "-date").innerHTML = minor_apod_response_json.date;
        }
        if (minor_apod_response_json.hasOwnProperty("title")) {
            document.getElementById("minor" + i + "-title").innerHTML = minor_apod_response_json.title;
        }
        if (minor_apod_response_json.hasOwnProperty("media_type") && minor_apod_response_json.hasOwnProperty("url")){
            if (minor_apod_response_json.media_type == "video") {
                document.getElementById("minor" + i + "-video").src = minor_apod_response_json.url;
            }
            else if (minor_apod_response_json.media_type == "image") {
                document.getElementById("minor" + i + "-picture").src = minor_apod_response_json.url;
                const element = document.getElementById("minor" + i + "-video");
                element.remove();
            }
        }
    }
}

// main
get_major_apod();
get_minor_apod();