import { getBlogPosts } from '/JS/getBlogPosts.js';
const baseUrl = "http://jarlerm.no/wp-json/wp/v2/posts";

const blogPosts = document.querySelector(".blog-container");

const urlPar = new URLSearchParams(document.location.search);
const id = urlPar.get("id");
const urlSingle = baseUrl + "/" + id;



async function displayBlogPosts() {
    try {
        const posts = await getBlogPosts(urlSingle);
        console.log(urlSingle);
        console.log(id);

        blogPosts.innerHTML ="";

        function createHtml(posts){
            blogPosts.innerHTML = "";
            const postTitle = posts.title.rendered;
            const postContent = posts.content.rendered;
            const postId = posts.id;
    

            blogPosts.innerHTML += `
                                    <div class ="blog-card-blog">
                                        <h2>${postTitle}</h2>
                                            ${postContent}
                                    </div>
                                `

        }
        createHtml(posts);

    } catch (error) {
        console.error(error);
    }
}

displayBlogPosts();

