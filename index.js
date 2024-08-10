async function get_major_apod() {
    //let major_apod_url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";
    let major_apod_url = "https://api.nasa.gov/planetary/apod?api_key=L2tecoNEQagoNEzVxASkC2tpVN8ZjgnxGeu0BWqB";

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
}

async function get_minor_apod() {
    let current_datetime = new Date();
    current_datetime.setDate(current_datetime.getDate() - 1);
    let end_year = current_datetime.getFullYear();
    let end_month = current_datetime.getMonth() + 1;
    let end_date = current_datetime.getDate();
    end = end_year + "-" + end_month + "-" + end_date;
    
    current_datetime.setDate(current_datetime.getDate() - 3);  // already deducted 1 from previous
    let start_year = current_datetime.getFullYear();
    let start_month = current_datetime.getMonth() + 1;
    let start_date = current_datetime.getDate();
    start = start_year + "-" + start_month + "-" + start_date;
    
    let minor_apod_url = "https://api.nasa.gov/planetary/apod?api_key=L2tecoNEQagoNEzVxASkC2tpVN8ZjgnxGeu0BWqB&start_date=" + start + "&end_date=" + end;
    let minor_apod_response = await fetch(minor_apod_url);
    let minor_apod_response_json = await minor_apod_response.json();
    
    for (let i = 4; i >= 1 ; i--) {
        if (minor_apod_response_json[i-1].hasOwnProperty("date")) {
            document.getElementById("minor" + i + "-date").innerHTML = minor_apod_response_json[4-i].date;
        }
        if (minor_apod_response_json[4-i].hasOwnProperty("title")) {
            document.getElementById("minor" + i + "-title").innerHTML = minor_apod_response_json[4-i].title;
        }
        if (minor_apod_response_json[4-i].hasOwnProperty("media_type") && minor_apod_response_json[4-i].hasOwnProperty("url")){
            if (minor_apod_response_json[4-i].media_type == "video") {
                document.getElementById("minor" + i + "-video").src = minor_apod_response_json[4-i].url;
            }
            else if (minor_apod_response_json[4-i].media_type == "image") {
                document.getElementById("minor" + i + "-picture").src = minor_apod_response_json[4-i].url;
                const element = document.getElementById("minor" + i + "-video");
                element.remove();
            }
        }
    }
}

// main
get_major_apod();
get_minor_apod();