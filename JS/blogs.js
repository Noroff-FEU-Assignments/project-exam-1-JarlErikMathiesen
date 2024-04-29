import { getBlogPosts } from '/JS/functions.js';
import { addHoverEffect } from '/JS/functions.js';
import { toggleNavDisplay } from '/JS/functions.js';
import { hamburgerMenu } from '/JS/functions.js';
import { navDisplay } from '/JS/functions.js';
import { baseUrl } from '/JS/functions.js';

const perPage = 10;
let currentPage = 1;
let posts = []; // Define posts array

const blogPosts = document.querySelector(".blogs-container");
const loadMoreBtn = document.querySelector("#load-more-btn");
const urlEmbed = "?_embed";

async function fetchAllBlogPosts() {
    try {
       let allPosts = await getBlogPosts(`${baseUrl}${urlEmbed}&per_page=${perPage * 10}`); 
        
       const authorSelect = document.getElementById("author-select");

       authorSelect.addEventListener("change", function() {
        
           const selectedAuthor = this.value;

           if(selectedAuthor === "all") {
                window.location.reload();
           }
       
           let filteredPosts = allPosts.filter(post => filterPosts(post, selectedAuthor));
       
           blogPosts.innerHTML = "";
        
           createHtml(filteredPosts);

           loadMoreBtn.style.display = "none";

           const blogCardBlogs = document.querySelectorAll(".blog-card-blogs");

           addHoverEffect(blogCardBlogs);
       });
       
       function filterPosts(post, author) {
           const postAuthor = post._embedded.author[0].name;
           return postAuthor === author;
       }


    const sortSelect = document.getElementById("sort-select");

    sortSelect.addEventListener("change", function(){
        
        const selectedSort = this.value;
        
        console.log(selectedSort);
    })

    } catch (error) {
        throw error;
    }
}
fetchAllBlogPosts();



// Move createHtml function outside displayBlogPosts function
function createHtml(posts) {
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
}

let loaderAnimation = document.getElementById("load-animation");


async function displayBlogPosts() {
    try {
        let newPosts = await getBlogPosts(`${baseUrl}${urlEmbed}&per_page=${perPage}&page=${currentPage}`);

        if (newPosts.length === 0 || newPosts.length < perPage) {
            loadMoreBtn.style.display = "none";
        }

        console.log(newPosts);
        console.log(newPosts.length);

        posts = posts.concat(newPosts); // Merge new posts with existing posts

        currentPage++;

        loadMoreBtn.addEventListener("click", displayBlogPosts);

        blogPosts.innerHTML = ""; // Clear previous posts

        createHtml(posts);

        const blogCardBlogs = document.querySelectorAll(".blog-card-blogs");

        addHoverEffect(blogCardBlogs);

    } catch (error) {
        blogPosts.innerHTML = `<h2 class="error">An error has occurred while loading the page</h2>`;
    }
    finally {
        loaderAnimation.remove();
    }
}

displayBlogPosts();

toggleNavDisplay(hamburgerMenu, navDisplay, 700);
