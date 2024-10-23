const username = 'Sddelcampo'; // Replace with the desired GitHub username

fetch(`/api/repositories/${username}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Log the repositories data to the console
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });