const searchBtn = document.getElementById("searchBtn");
const usernameInput = document.getElementById("username");
const profileInfo = document.getElementById("profileInfo");
const repoList = document.getElementById("repoInfo");
const repoContainer = document.getElementById("repoContainer");

searchBtn.addEventListener("click", () => {
  const username = usernameInput.value;
  if (username) {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => {
        const profileData = `
                            <h2>${data.login}</h2>
                            <img src="${data.avatar_url}" alt="${
          data.login
        }" width="200">
                            <p>Name: ${data.name || "Not provided"}</p>
                            <p>Username: ${data.username}</p>
                            <p>Location: ${data.location || "Not provided"}</p>
                            <p>Email: ${data.email}</p>
                            <p>Number of Gists: ${data.gists_url}</p>
                        `;
        profileInfo.innerHTML = profileData;
      })
      .catch((error) => {
        profileInfo.innerHTML = `<p>Error: ${error.message}</p>`;
      });

    //Fetch user repositories
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => response.json())
      .then((data) => {
        const repoData = data
          .map((repo) => {
            return `
                                <div>
                                    <strong>${repo.name}</strong>
                                    <p>${
                                      repo.description ||
                                      "No description available"
                                    }</p>
                                </div>
                            `;
          })
          .join("");
        repoList.innerHTML = repoData;

        //Making scrollable list
        // Make the container scrollable if the number of repositories exceeds 5
        if (data.length > 5) {
          repoContainer.style.height = "300px"; // Set a fixed height
        } else {
          repoContainer.style.height = "auto"; // Auto height
        }
      })
      .catch((error) => {
        repoList.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  }
});
