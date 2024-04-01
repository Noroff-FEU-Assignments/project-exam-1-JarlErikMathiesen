import { getBlogPosts } from '/JS/getBlogPosts.js';
const baseUrl = "http://jarlerm.no/wp-json/wp/v2/posts";

const blogPosts = document.querySelector(".blogs-container");


async function displayBlogPosts() {
    try {
        const posts = await getBlogPosts(baseUrl);
        console.log(posts[0].id);

        blogPosts.innerHTML ="";

        function createHtml(posts){
            blogPosts.innerHTML = "";
            posts.forEach(function(post){
                const postTitle = post.title.rendered;
                const postContent = post.content.rendered;
                const postId = post.id;
        

                blogPosts.innerHTML += `
                                    <a href="blog.html?id=${postId}">
                                        <div class = "blog-card-blogs">
                                            <h2>${postTitle}</h2>
                                                ${postContent}
                                        </div>
                                    </a>
                                    `
            })

        }
        createHtml(posts);

    } catch (error) {
        console.error(error);
    }
}

displayBlogPosts();


