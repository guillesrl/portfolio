// Quick browser test - open console on portfolio page
// Check what images are being detected

fetch('https://api.github.com/users/guillesrl/repos?per_page=5')
  .then(res => res.json())
  .then(repos => {
    console.log('Repos fetched:', repos.length);
    repos.forEach(repo => console.log(repo.name, repo.default_branch || 'main'));
  });
