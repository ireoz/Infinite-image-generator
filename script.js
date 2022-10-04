const accessKey = 'vO-FKIksPGPipWk3BWM0FZ7Mga50VPyT7ScjIx8Z3_c';
const ApiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=30`

//  create variables for img and page loader , add to DOM
const imgContainer = document.querySelector('.img-container');
const loadContainer = document.getElementById('loader');
let photoArray = [];
let imagesCount = 0;
let pageLoaded = false;


function imageLoaded(){
    imagesCount++
    if(imagesCount === 30){
        pageLoaded = true;
        imagesCount = 0;
    }

}

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
        // add event when image is loaded to the screen.
        imageElement.addEventListener('load', imageLoaded())
       
    })
    hidePageLoader();
}

// show loader 
function showPageLoader() {
loadContainer.hidden = false;
}

function hidePageLoader (){
    loadContainer.hidden = true;
}

// create event to get more images when scroller reaches the bottom of the page.
window.addEventListener('scroll', () => {
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight && pageLoaded){
        getImages();
        pageLoaded = false;
    }
})


showPageLoader();
 getImages();

