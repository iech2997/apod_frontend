async function get_apod() {
    let apod_url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";
    let response = await fetch(apod_url);
    document.getElementById("explain").innerHTML = await response;
}

// main
get_apod();