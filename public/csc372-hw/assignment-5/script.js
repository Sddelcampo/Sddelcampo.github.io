"use strict";

// Ensures that the default is my GitHub account
const defaultUsername = 'Sddelcampo'; 

// Event listener for search button
document.querySelector("#search-btn").addEventListener("click", () => {
  const username = document.querySelector("#username-input").value.trim();
  if (username) {
    fetchRepositories(username);
  }
});

// Fetches my account as the first thing that appears when the page loads
window.onload = () => {
  fetchRepositories(defaultUsername);
};

// Function to fetch repositories from the GitHub API
function fetchRepositories(username) {
  const repoContainer = document.querySelector("#repo-container");
  repoContainer.innerHTML = '';

  // GitHub Token to avoid API rate limiting
  const token = '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';

  // Fetches from the GitHub API based on the username that was inputted
  fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      'Authorization': `token ${token}`,
      'User-Agent': 'JavaScript-App'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch repositories.');
      }
      return response.json();
    })
    .then(data => {
      const template = document.querySelector(".repo-item-template");

      // Loop through each repository in the API response
      data.forEach(repo => {
        const repoClone = template.cloneNode(true);
        repoClone.style.display = 'block';

        // Data to display text into each repository block
        repoClone.querySelector(".repo-name").textContent = repo.name;
        repoClone.querySelector(".repo-description").textContent = 'Description: ' + (repo.description ? repo.description : 'No description available.');
        repoClone.querySelector(".repo-created").textContent = `Created on: ${new Date(repo.created_at).toLocaleDateString()}`;
        repoClone.querySelector(".repo-updated").textContent = `Last updated: ${new Date(repo.updated_at).toLocaleDateString()}`;
        repoClone.querySelector(".repo-link").href = repo.html_url;
        repoClone.querySelector(".repo-watchers").textContent = `Watchers: ${repo.watchers_count}`;

        // Fetches number of commits for the repository
        fetch(repo.commits_url.replace("{/sha}", ""), {
          headers: {
            'Authorization': `token ${token}`,
            'User-Agent': 'JavaScript-App'
          }
        })
          .then(commitResponse => commitResponse.json())
          .then(commits => {
            repoClone.querySelector(".repo-commits").textContent = `Commits: ${commits.length}`;
          });

        // Fetch the languages that are used in the repository
        fetch(repo.languages_url, {
          headers: {
            'Authorization': `token ${token}`,
            'User-Agent': 'JavaScript-App'
          }
        })
          .then(langResponse => langResponse.json())
          .then(languages => {
            const langList = Object.keys(languages).join(', ');
            repoClone.querySelector(".repo-languages").textContent = `Languages: ${langList || 'None'}`;
          });

        // Append the cloned repository entry to the container
        repoContainer.appendChild(repoClone);
      });
    })
    // Catches any errors that may occur with the API such as rate limits.
    .catch(error => {
      console.error('Error fetching repositories:', error);
    });
}
