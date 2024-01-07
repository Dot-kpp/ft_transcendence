// Define your application state
let appState = {
    someData: null,
    originalContent: null,
};

// Save the original content and fetch some data from the server when the page loads
window.addEventListener('load', () => {
    // Save the original content
    appState.originalContent = document.getElementById('main-content').innerHTML;

    fetch('/api/some-data')
        .then(response => response.json())
        .then(data => {
            // Update the state of your application with the data
            appState.someData = data;

            // Update the DOM to reflect the new state
            updateDOM();
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Function to update the DOM based on the state of the application
function updateDOM() {
    // If someData is not null, show the About page
    if (appState.someData !== null) {
        showPage('About');
    }
}

// Function to show a page
function showPage(pageName) {
    if (pageName === 'index') {
        // If the page is 'index', restore the original content
        document.getElementById('main-content').innerHTML = appState.originalContent;
    } else {
        // Otherwise, fetch the page content
        fetch(`${pageName}.html`)
            .then(response => response.text())
            .then(html => {
                // Insert the page content into the main content div
                document.getElementById('main-content').innerHTML = html;

                if (pageName === './Pages/game') {
                    startGame();
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}