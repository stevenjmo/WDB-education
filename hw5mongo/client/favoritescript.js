(() => {
    // makeAPOD is used to create a APOD node in the following format:
    // <div class="apod">
    //     <small id="apod-date"> 02-21-2021 </small>
    //     <img id="apod-image" width="200px" src="https://apod.nasa.gov/apod/image/2102/rosette_goldman_960.jpg" alt="">
    // </div>
    const makeAPOD = (url, date) => {
        var div = document.createElement("div");
        div.className = "apod";
        var small = document.createElement("small");
        small.id = "apod-date";
        small.innerText = date;
        var img = document.createElement("img");
        img.src = url;
        img.style.width = "200px"
        div.appendChild(small);
        div.appendChild(img);
        return div
    }

    // TODO: Fetch a list of APODs from the database.
    // Here the apods are filled with dummy data.

    let apods_lst = []

    async function fetchApods() {
        const response = await fetch('http://localhost:8080/api/db/all');
        const apods = await response.json();
        return apods;
    }

    fetchApods().then(apods => {
        // console.log(apods);
        apods = apods.apods;
        console.log(apods);

        for (let i = 0; i < apods.length; i++) {
            let lst = [];
            lst.push(apods[i].image_url);
            lst.push(apods[i].date);
            console.log("list: " + lst);
            apods_lst.push(lst);
        }

        var al = document.getElementById("apod-list");
        for (let apod of apods_lst) {
            // console.log("TEST: " + apod)
            al.appendChild(makeAPOD(apod[0], apod[1]))
        }
    });

    // TEST APODS LIST

    // apods_test = [["https://apod.nasa.gov/apod/image/2102/rosette_goldman_960.jpg", "02-21-2021"], ["https://apod.nasa.gov/apod/image/2102/rosette_goldman_960.jpg", "02-20-2021"]]
    // var al = document.getElementById("apod-list");
    // for (let apod of apods_test) {
    //     al.appendChild(makeAPOD(apod[0], apod[1]))
    // }
})()