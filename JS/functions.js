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

export const baseUrl = "https://jarlerm.no/wp-json/wp/v2/posts";
export const hamburgerMenu = document.querySelector(".hamburger-icon");
export const navDisplay = document.querySelector("nav");