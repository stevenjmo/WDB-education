console.log("script connected.")

var heart_status = 0 // 0 is empty and 1 is filled.
let baseUrl = 'https://api.nasa.gov/planetary/apod?api_key=';
let apiKey = 'vSgXHTqRdD3kiesHo0Lde5v1T4Cg6qrJa0swGqyc';
let thumbUrl = '&thumbs=true';
let date = 26;

// info for POST
let currentDate = "2021-02-21";
let currentUrl = "https://apod.nasa.gov/apod/image/2102/rosette_goldman_960.jpg";

// info for DELETE
let currId = '';


document.getElementById("heart-button").addEventListener("click", () => {
    let heart = document.getElementById("heart-button");
    if (heart_status == 0) {
        heart.src = "static/heart-filled.png"
        heart_status = 1
        // TODO: update the database and mark this image as a favorite image. 

        fetch("http://localhost:8080/api/db", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({image_url: currentUrl, date: currentDate})
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            console.log('id: ' + result.id);
            currId = result.id;
        })
        .catch(error => {
            console.error('Error:', error);
        });

        
    } else {
        heart_status = 0
        heart.src = "static/heart.png"
        // TODO: update the database and un-mark this image as a favorite image.
        
        fetch("http://localhost:8080/api/db/" + currId, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({image_url: currentUrl, date: currentDate})
        })
        .then(function(res){ console.log(res) })
        .catch(function(res){ console.log(res) })
    }
})

document.getElementById("next-button").addEventListener("click", () => {
    document.getElementById("heart-button").src = "static/heart.png";
    heart_status = 0
    // TODO: Get the image url, title, description, and date from the database using Fetch.
    // you can use let date = document.getElementById("apod-date"); to change the date.

    let dateUrl = '&date=2021-10-'+date;
    date -= 1;

    fetch(baseUrl + apiKey + thumbUrl + dateUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            let apod_date = data.date;
            let apod_title = data.title;
            let apod_desc = data.explanation;

            // let test_url = "https://cdn.mos.cms.futurecdn.net/3upZx2gxxLpW7MBbnKYQLH-1200-80.jpg";

            document.getElementById("apod-date").innerText = apod_date;
            document.getElementById("apod-title").innerText = apod_title;
            document.getElementById("apod-p").innerText = apod_desc;
            let apod_url = data.url;

            // if (data.url === null) {
            //     apod_url = data.thumbnail_url;
            // }

            if (data.hasOwnProperty("thumbnail_url")) {
                let apod_thumbs_url = data.thumbnail_url;
                document.getElementById("apod-image").src = apod_thumbs_url;
            } else {
                document.getElementById("apod-image").src = apod_url;
            }

            // if (data.media_type = 'video') {
            //     // console.log("video");
            //     let apod_thumbs_url = data.thumbnail_url;
            //     document.getElementById("apod-image").src = apod_thumbs_url;
            // } else {
            //     // console.log("image");
            //     let apod_url = data.hdurl;
            //     document.getElementById("apod-image").src = apod_url;
            // }

            currentDate = apod_date;
            currentUrl = document.getElementById("apod-image").src;

            console.log("current date: " + currentDate);
            console.log("current url: " + currentUrl);
        });
})