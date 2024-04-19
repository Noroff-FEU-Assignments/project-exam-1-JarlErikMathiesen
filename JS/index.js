import { getBlogPosts } from '/JS/functions.js';
import { addHoverEffect } from '/JS/functions.js';
import { toggleNavDisplay } from '/JS/functions.js';
import { hamburgerMenu } from '/JS/functions.js';
import { navDisplay } from '/JS/functions.js';
import { baseUrl } from '/JS/functions.js';


const perPage = 20; 
const urlEmbed = "?_embed";

const blogPosts = document.querySelector(".blog-container");
const nextButton = document.querySelector(".nxt-btn");
const previousButton = document.querySelector(".pre-btn");


toggleNavDisplay(hamburgerMenu, navDisplay, 700);


function handleScrolling() {
    let blogPostcontainer = blogPosts.getBoundingClientRect();
    let blogPostWidth = blogPostcontainer.width;

    function updateBlogPostWidth() {
        blogPostcontainer = blogPosts.getBoundingClientRect();
        blogPostWidth = blogPostcontainer.width;
    }

    window.addEventListener("resize", updateBlogPostWidth);

    nextButton.addEventListener("click", function() {
        blogPosts.scrollLeft += blogPostWidth;
    });

    previousButton.addEventListener("click", function() {
        blogPosts.scrollLeft -= blogPostWidth;
    });
}

async function displayBlogPosts() {
    try {
        const posts = await getBlogPosts(`${baseUrl}${urlEmbed}&per_page=${perPage}`);
        console.log(posts);
        blogPosts.innerHTML = "";
        
        posts.forEach(function(post){
            const postTitle = post.title.rendered;
            const postContent = post.content.rendered;
            const postId = post.id;
            const postExcerpt = post.excerpt.rendered;
            const postDate = post.date;
            const postAuthor = post._embedded.author[0].name;

            const postDateClean = postDate.replace(/T/g, ' ');

            console.log(postDateClean);

            blogPosts.innerHTML += `
                <a href="blog.html?id=${postId}" class="blog-card blog-card-main">
                    <h2>${postTitle}</h2>
                    <span>${postDateClean}</span>
                    <span>${postAuthor}</span>
                    ${postExcerpt}
                </a>`;

            const blogCardMain = document.querySelectorAll(".blog-card-main");
            addHoverEffect(blogCardMain);
        });

        handleScrolling();
        
    } catch (error) {
        blogPosts.innerHTML = `<h2 class="error">An error has occurred while loading the page</h2>`;
    }
}

displayBlogPosts();

