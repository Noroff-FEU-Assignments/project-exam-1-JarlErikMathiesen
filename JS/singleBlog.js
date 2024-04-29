import { getBlogPosts } from '/JS/functions.js';
import { toggleNavDisplay } from '/JS/functions.js';
import { hamburgerMenu } from '/JS/functions.js';
import { navDisplay } from '/JS/functions.js';
import { baseUrl } from '/JS/functions.js';



const blogPosts = document.querySelector(".blog-container-single");

const urlPar = new URLSearchParams(document.location.search);
const id = urlPar.get("id");
const urlSingle = baseUrl + "/" + id + "?_embed";
const urlEmbed = "?_embed";



async function displayBlogPosts() {
    try {
        const posts = await getBlogPosts(`${baseUrl}/${id}${urlEmbed}`);
        blogPosts.innerHTML ="";

        function createHtml(posts) {
            const postTitle = posts.title.rendered;
            const postContent = posts.content.rendered;
            const postAuthor = posts._embedded.author[0].name;
            const postDate = posts.date;
            const postDateClean = postDate.replace(/T/g, ' ');

            console.log(posts);
        
            let imageHtml = '';
        
            if (posts._embedded && posts._embedded["wp:featuredmedia"] && posts._embedded["wp:featuredmedia"][0]) {
                
                const postImage = posts._embedded["wp:featuredmedia"][0].link;
                const postImageAltText = posts._embedded["wp:featuredmedia"][0].alt_text;

                imageHtml = `<div>
                                <div id="imageModal" class="modal">
                                    <img class="modal-content" id="modalImage" src="${postImage}" alt="${postImageAltText}">
                                </div>
                                <div class="blog-card-blog">
                                    <img class="blog-image blog-card" src="${postImage}" alt="${postImageAltText}"/>
                                </div>
                            </div>`;
            }
        
            blogPosts.innerHTML += `
                                    ${imageHtml}
                                    <div class="blog-card blog-card-blog">
                                        <h2>${postTitle}</h2>
                                        <span>${postAuthor}</span>
                                        <span>${postDateClean}</span>
                                        ${postContent}
                                        </div>
                                    `;
        }   

        createHtml(posts);

        const modal = document.querySelector("#imageModal");
        const modalImg = document.querySelector("#modalImage");
        const image = document.querySelector(".blog-image");

        if (image) {
            image.addEventListener("click", function() {
                modal.style.display = "block";
                modalImg.src = this.src;
                document.body.classList.add("modal-open");
            });
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                document.body.classList.remove("modal-open");
            }
        };

    } catch (error) {
        blogPosts.innerHTML = `<h2 class="error">An error has occurred while loading the page</h2>`;
    }
}

displayBlogPosts();

toggleNavDisplay(hamburgerMenu, navDisplay, 700);