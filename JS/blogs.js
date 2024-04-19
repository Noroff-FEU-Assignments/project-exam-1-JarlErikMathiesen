import { getBlogPosts } from '/JS/functions.js';
import { addHoverEffect } from '/JS/functions.js';
import { toggleNavDisplay } from '/JS/functions.js';
import { hamburgerMenu } from '/JS/functions.js';
import { navDisplay } from '/JS/functions.js';
import { baseUrl } from '/JS/functions.js';


const perPage = 10; 
let currentPage = 1; 

const blogPosts = document.querySelector(".blogs-container");
const loadMoreBtn = document.querySelector("#load-more-btn");
const urlEmbed = "?_embed";

async function displayBlogPosts() {
    try {
        const posts = await getBlogPosts(`${baseUrl}${urlEmbed}&per_page=${perPage}&page=${currentPage}`);
        
        if (posts.length === 0 || posts.length < perPage) {
            loadMoreBtn.style.display = "none";
        }

        console.log(posts);

        currentPage++;
        
        loadMoreBtn.addEventListener("click", displayBlogPosts);

        blogPosts.innerHTML += "";

        posts.forEach(function(post) {
            const postTitle = post.title.rendered;

            const postId = post.id;
            const postExcerpt = post.excerpt.rendered;
            const postDate = post.date;
            const postAuthor = post._embedded.author[0].name;

            const postDateClean = postDate.replace(/T/g, ' ');

            blogPosts.innerHTML += `
                <a href="blog.html?id=${postId}" class="blog-card-blogs blog-card">

                        <h2>${postTitle}</h2>
                        <span>${postDateClean}</span>
                        <span>${postAuthor}</span>
                        ${postExcerpt}

                </a>`;


        });

        const blogCardBlogs = document.querySelectorAll(".blog-card-blogs");
        
        addHoverEffect(blogCardBlogs);

    } catch (error) {
        blogPosts.innerHTML = `<h2 class="error">An error has occurred while loading the page</h2>`;
    }
    finally {
        const loaderAnimation = document.getElementById("load-animation");
        loaderAnimation.remove();
    }
}

displayBlogPosts();

toggleNavDisplay(hamburgerMenu, navDisplay, 700);


