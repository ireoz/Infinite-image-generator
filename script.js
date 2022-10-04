const accessKey = 'vO-FKIksPGPipWk3BWM0FZ7Mga50VPyT7ScjIx8Z3_c';
const ApiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=2`

//  create variables for img and page loader , add to DOM
const imgContainer = document.querySelector('.img-container');
const loadContainer = document.getElementById('loader');
let photoArray = [];

async function getImages() {
    try {
        if(!showPageLoader()){
            showPageLoader()
        }
         const response = await fetch(ApiUrl);
        photoArray = await response.json();       
        displayImages();
         } catch (error) {
            // catch error here
        alert(error);
    }
}

function displayImages() {
    // run function for each object of the array.
    photoArray.forEach((image) => {
        let imageSrc = image.urls.regular
        let imageAlt = image.description
        let imageElement = document.createElement('img');
        imageElement.src = imageSrc;
        imageElement.alt = imageAlt;
        imgContainer.appendChild(imageElement);
        hidePageLoader();
    })
}

// show loader 
function showPageLoader() {
loadContainer.hidden = false;
}

function hidePageLoader (){
    loadContainer.hidden = true;
}




showPageLoader();
 getImages();

