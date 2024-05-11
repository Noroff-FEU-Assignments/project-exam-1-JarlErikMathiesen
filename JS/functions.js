export function addHoverEffect(cards) {
    cards.forEach(function(card) {
        card.addEventListener('mouseover', function() {
            cards.forEach(function(otherCard) {
                if (otherCard !== card) {
                    otherCard.classList.add('hover-effect');
                }
            });
        });
        
        card.addEventListener('mouseout', function() {
            cards.forEach(function(otherCard) {
                otherCard.classList.remove('hover-effect');
            });
        });
    });
}

export async function getBlogPosts(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error();
    }
    return await response.json();
}

export function toggleNavDisplay(hamburger,navDisplay, breakpoint) {
    hamburger.addEventListener("click", function(){
        if (navDisplay.style.display === "block") {
            navDisplay.style.display = "none";
        } else {
            navDisplay.style.display = "block";
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > breakpoint) {
            navDisplay.style.display = "block";
        } else {
            navDisplay.style.display = "none";
        }
    });
}

export function IfBlogCardHasImage(imagePost){

    if (imagePost._embedded && imagePost._embedded["wp:featuredmedia"] && imagePost._embedded["wp:featuredmedia"][0]) {
            
        let postImage = imagePost._embedded["wp:featuredmedia"][0].link;
        let postImageAltText = imagePost._embedded["wp:featuredmedia"][0].alt_text;

        imageHtml = `
                        <img class="blog-card-image" src="${postImage}" alt="${postImageAltText}"/>
                    `;
    }
    else {
        imageHtml = '';
    }
}


export const baseUrl = "https://jarlerm.no/wp-json/wp/v2/posts";
export const hamburgerMenu = document.querySelector(".hamburger-icon");
export const navDisplay = document.querySelector("nav");
export let imageHtml = '';