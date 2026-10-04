/* Post It JavaScript */

const secretKey = "PostItSecretKey2026";
let user = null;

/* Store the user's information */
function saveUser() {

    user = {
        fullname: document.getElementById("fullname").value,
        birthday: document.getElementById("birthday").value,
        yearlevel: document.getElementById("yearlevel").value,
        gender: document.getElementById("gender").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    /* Check if all fields are filled in */
    if (
        user.fullname === "" ||
        user.birthday === "" ||
        user.yearlevel === "" ||
        user.gender === "" ||
        user.username === "" ||
        user.password === ""
    ) {
        document.getElementById("message").textContent =
            "Please complete all fields.";

        return;
    }

    /* Hide the user information form */
    document.getElementById("userSection").style.display = "none";


    /* Show the post section */
    document.getElementById("postSection").style.display = "block";


    document.getElementById("message").textContent =
        "You can now create a post.";
}


/* Create a new post */
function addPost() {

    const post = document.getElementById("post").value;


    /* Check if the caption is empty */
    if (post === "") {
        document.getElementById("message").textContent =
            "Please enter a caption.";

        return;
    }


    /* Get the current date and time */
    const date = new Date().toLocaleString();


    /* Store the post information */
    const data = {
        username: user.username,
        post: post,
        date: date
    };


    /* Change the post data into text */
    const text = JSON.stringify(data);


    /* Encrypt the post using AES */
    const encrypted = CryptoJS.AES.encrypt(
        text,
        secretKey
    ).toString();


    /* Create a box for the post */
    const postBox = document.createElement("div");

    postBox.className = "post-card";


    /* Show the original and encrypted post */
    postBox.innerHTML = `
        <div class="original-title">
            ORIGINAL POST
        </div>

        <div class="original-content">
            <b>User:</b> ${user.username}<br><br>
            <b>Post:</b> ${post}<br><br>
            <b>Date:</b> ${date}
        </div>

        <div class="encrypted-title">
            ENCRYPTED
        </div>

        <div class="encrypted-content">
            ${encrypted}
        </div>
    `;

    /* Add the post to the top of the list */
    document.getElementById("posts").prepend(postBox);


    /* Clear the post box */
    document.getElementById("post").value = "";


    /* Show a success message */
    document.getElementById("message").textContent =
        "Post added successfully.";
}