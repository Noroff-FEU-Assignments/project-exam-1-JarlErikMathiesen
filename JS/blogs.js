import { getBlogPosts } from '/JS/functions.js';
import { addHoverEffect } from '/JS/functions.js';
import { toggleNavDisplay } from '/JS/functions.js';
import { hamburgerMenu } from '/JS/functions.js';
import { navDisplay } from '/JS/functions.js';
import { baseUrl } from '/JS/functions.js';
import { IfBlogCardHasImage } from '/JS/functions.js';
import { imageHtml } from '/JS/functions.js';

const perPage = 10;
let currentPage = 1;
let posts = [];

const blogPosts = document.querySelector(".blogs-container");
const loadMoreBtn = document.querySelector("#load-more-btn");
const urlEmbed = "?_embed";

async function filterAllBlogPosts() {
    try {
       let allPosts = await getBlogPosts(`${baseUrl}${urlEmbed}&per_page=${perPage * 10}`); 

       const search = document.querySelector(".search");
    
       search.onkeyup = function(event) {
           console.log(event);
       
           const searchValue = event.target.value.trim().toLowerCase();
       
           const filteredPostsByName = allPosts.filter(function(post) {           
            if(post.title.rendered.toLowerCase().startsWith(searchValue)){
            return true}
           });
           
           blogPosts.innerHTML = "";
           createHtml(filteredPostsByName);    
       }

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
       });
       
       const sortSelect = document.getElementById("sort-select");

       sortSelect.addEventListener("change", function(){
           const selectedSort = this.value;
           
           if (selectedSort === "new") {
            allPosts.sort(function(a, b) {
                return new Date(b.date) - new Date(a.date);
            });
           } else if (selectedSort === "old") {
                allPosts.sort(function(a, b) {
                return new Date(a.date) - new Date(b.date)
            });
           } else if (selectedSort === "nameasc") {
                allPosts.sort(function(a, b) {
                return a.title.rendered.localeCompare(b.title.rendered)
            });
           } else if (selectedSort === "namedesc") {
                allPosts.sort(function(a, b) {
                return b.title.rendered.localeCompare(a.title.rendered)
            });
           }
           
           blogPosts.innerHTML = "";
           createHtml(allPosts);

           loadMoreBtn.style.display = "none";
       });

       function filterPosts(post, author) {
           const postAuthor = post._embedded.author[0].name;
           return postAuthor === author;
       }

    } catch (error) {
        throw error;
    }
}

filterAllBlogPosts();

function createHtml(posts) {
    posts.forEach(function(post) {
        const postTitle = post.title.rendered;
        const postId = post.id;
        const postExcerpt = post.excerpt.rendered;
        const postDate = post.date;
        const postAuthor = post._embedded.author[0].name;
        const postDateClean = postDate.replace(/T/g, ' ');

        IfBlogCardHasImage(post);

        blogPosts.innerHTML += `
            <a href="blog.html?id=${postId}" class="blog-card-blogs blog-card">
                ${imageHtml}
                <h2>${postTitle}</h2>
                <span>${postDateClean}</span>
                <span>${postAuthor}</span>
                ${postExcerpt}
            </a>`;

            const blogCardBlogs = document.querySelectorAll(".blog-card-blogs");
            addHoverEffect(blogCardBlogs);
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

        posts = posts.concat(newPosts);

        currentPage++;

        loadMoreBtn.addEventListener("click", displayBlogPosts);

        blogPosts.innerHTML = "";

        createHtml(posts);

    } catch (error) {
        blogPosts.innerHTML = `<h2 class="error">An error has occurred while loading the page</h2>`;
    }
    finally {
        loaderAnimation.remove();
    }
}

displayBlogPosts();

toggleNavDisplay(hamburgerMenu, navDisplay, 700);
