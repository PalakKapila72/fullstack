let featuredJobs = document.getElementById("featured-jobs");
let jobForm = document.getElementById("jobForm");
let jobCountText = document.getElementById("jobCount");

function updateJobCount() {
    let totalJobs = featuredJobs.querySelectorAll("article").length;
    jobCountText.innerText = "Total Jobs: " + totalJobs;
}

updateJobCount();

jobForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let title = document.getElementById("jobTitle").value.trim();
    let location = document.getElementById("jobLocation").value.trim();
    let exp = document.getElementById("jobExp").value.trim();

    if (title === "" || location === "" || exp === "") {
        alert("Please fill all fields!");
        return;
    }

    let newJob = document.createElement("article");

    newJob.innerHTML = `
        <h4>${title}</h4>
        <p>${location} • ${exp}+ years</p>
        <button class="apply-btn">Apply Now</button>
        <button class="delete-btn">Delete Job</button>
    `;

    featuredJobs.appendChild(newJob);

    jobForm.reset();
    updateJobCount();
});

featuredJobs.addEventListener("click", function(e) {

    if (e.target.classList.contains("apply-btn")) {
        e.target.innerText = "Applied ✅";
        e.target.disabled = true;
        e.target.style.background = "gray";
    }

    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
        updateJobCount();
    }
});
