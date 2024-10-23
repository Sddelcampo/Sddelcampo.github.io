"use strict";

const express = require("express");
const https = require("https"); // Import the https module
const app = express();

const fs = require("fs").promises;
const multer = require("multer");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());

// Endpoint to fetch repositories for a user
app.get('/api/repositories/:username', (req, res) => {
  const username = req.params.username;

  const url = `https://api.github.com/users/${username}/repos`;
  const options = {
      headers: {
          'User-Agent': 'Node.js' // GitHub requires a User-Agent header
      }
  };

  https.get(url, options, (response) => {
      let data = '';

      // A chunk of data has been received.
      response.on('data', (chunk) => {
          data += chunk;
      });

      // The whole response has been received.
      response.on('end', () => {
          const repositories = JSON.parse(data).map(repo => ({
              name: repo.name,
              description: repo.description,
              created_at: repo.created_at,
              updated_at: repo.updated_at,
              commits_url: repo.commits_url.replace('{/sha}', ''), // URL to fetch commits
              languages_url: repo.languages_url, // URL to fetch languages
              watchers_count: repo.watchers_count,
          }));

          // Send the repositories data back to the client
          res.json(repositories);
      });
  }).on("error", (error) => {
      console.error(error);
      res.status(500).send('Error fetching repositories from GitHub API');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Server listening on port: ' + PORT + "!");
});