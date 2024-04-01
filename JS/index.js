import { getBlogPosts } from '/JS/getBlogPosts.js';
const baseUrl = "http://jarlerm.no/wp-json/wp/v2/posts";



const blogPosts = document.querySelector(".blog-container");



const rightButton = document.querySelector(".nxt-btn");
const leftButton = document.querySelector(".pre-btn");

rightButton.addEventListener("click", () => {
    blogPosts.scrollLeft += 450;
});

leftButton.addEventListener("click", () => {
    blogPosts.scrollLeft -= 450;
});

async function displayBlogPosts() {
    try {
        const posts = await getBlogPosts(baseUrl);
        blogPosts.innerHTML ="";

        function createHtml(posts){
            blogPosts.innerHTML = "";
            posts.forEach(function(post){
                const postTitle = post.title.rendered;
                const postContent = post.content.rendered;
                

                blogPosts.innerHTML += `
                                        <div class = "blog-card-main">
                                            <h2>${postTitle}</h2>
                                                ${postContent}
                                        </div>`
                                        
            })

        }
        createHtml(posts);
    } catch (error) {
        console.error(error);
    }
}

displayBlogPosts();





/* async function getBlogPosts(url) {

    try {
        const response = await fetch(url);
        const json = await response.json();
        const posts = json;

        console.log(posts);
        console.log(posts[0].title.rendered);
        console.log(posts[0].content.rendered);
        
        const blogPosts = document.querySelector(".blog-container");

        blogPosts.innerHTML ="";

        function createHtml(posts){
            blogPosts.innerHTML = "";
            posts.forEach(function(post){
                const postTitle = post.title.rendered;
                const postContent = post.content.rendered;
                

                blogPosts.innerHTML += `
                                        <div class = "blog-card-main">
                                            <h2>${postTitle}</h2>
                                                ${postContent}
                                        </div>`
                                        
            })

        }

    createHtml(posts);


    }

    catch (error){
        blogPosts.innerHTML =   `<div class="error">An error occured loading the page</div>`;
    }
}


getBlogPosts(baseUrl);
 */



/* rightButton.onclick = () => {
  document.getElementsByClassName("blog-container").scrollLeft += 20;
};
 */