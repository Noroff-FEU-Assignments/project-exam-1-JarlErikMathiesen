import { getBlogPosts } from '/JS/getBlogPosts.js';

const baseUrl = "http://jarlerm.no/wp-json/wp/v2/posts";
const perPage = 10; 
let currentPage = 1; 

const blogPosts = document.querySelector(".blogs-container");
const loadMoreBtn = document.querySelector("#load-more-btn");

async function displayBlogPosts() {
    try {
        const posts = await getBlogPosts(`${baseUrl}?per_page=${perPage}&page=${currentPage}`);
        
        if (posts.length === 0 || posts.length < perPage) {
            loadMoreBtn.style.display = "none";
        }

        currentPage++;
        
        loadMoreBtn.addEventListener("click", displayBlogPosts);

        posts.forEach(function(post) {
            const postTitle = post.title.rendered;
            const postContent = post.content.rendered;
            const postId = post.id;

            blogPosts.innerHTML += `
                <a href="blog.html?id=${postId}">
                    <div class="blog-card-blogs">
                        <h2>${postTitle}</h2>
                        ${postContent}
                    </div>
                </a>`;
        });



    } catch (error) {
        console.error(error);
    }
}




displayBlogPosts();


