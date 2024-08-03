async function get_apod() {
    let apod_url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";
    // The fetch() function returns a Promise which is fulfilled with a Response object representing the server's response.
    let apod_response = await fetch(apod_url);
    // Response.json() Returns a promise that is the result of taking JSON as input and parsing it to produce a JavaScript object.
    let apod_response_json = await apod_response.json();
    document.getElementById("major-title").innerHTML = apod_response_json.title;
    document.getElementById("major-picture").src = apod_response_json.url;
    document.getElementById("major-copyright").innerHTML = apod_response_json.copyright;
    document.getElementById("major-explanation").innerHTML = apod_response_json.explanation;
    console.log(apod_response_json);
}

// main
get_apod();