import { getBlogPosts } from '/JS/getBlogPosts.js';
const baseUrl = "http://jarlerm.no/wp-json/wp/v2/posts";
const perPage = 20; 
const urlEmbed = "?_embed";


const blogPosts = document.querySelector(".blog-container");

const rightButton = document.querySelector(".nxt-btn");
const leftButton = document.querySelector(".pre-btn");

rightButton.addEventListener("click", function() {
    blogPosts.scrollLeft += 450;
});

leftButton.addEventListener("click", function() {
    blogPosts.scrollLeft -= 450;
});

async function displayBlogPosts() {
    try {
        const posts = await getBlogPosts(`${baseUrl}${urlEmbed}&per_page=${perPage}`);
        console.log(posts);

        blogPosts.innerHTML ="";


        function createHtml(posts){
            blogPosts.innerHTML = "";
            posts.forEach(function(post){
                const postTitle = post.title.rendered;
                const postContent = post.content.rendered;
                const postId = post.id;
                

                blogPosts.innerHTML += `
                                        <a href="blog.html?id=${postId}">
                                        <div class = "blog-card-main">
                                            <h2>${postTitle}</h2>
                                                ${postContent}
                                        </div>
                                        </a>`
                                        
                                        
            })

        }
        createHtml(posts);
    } catch (error) {
        console.error(error);
    }
}

displayBlogPosts();

