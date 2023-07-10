
// Function to perform the search and display results
async function searchData() {
  const searchInput = document.getElementById('searchInput').value;
  const searchResults = document.getElementById('searchResults');

  // Clear previous search results
  searchResults.innerHTML = '';

  try {
    const response = await fetch(`/search/${searchInput}`);
    const data = await response.json();

    // Display search results
    if (data.length > 0) {
      data.forEach(result => {
        const resultCard = document.createElement('div');
        resultCard.className = 'card';
        resultCard.innerHTML = `
         <img src="/roomImage/${result.roomImage}" alt="Image">
          <p>Address: ${result.address}</p>
          <p>City: ${result.city}</p>
          <p>Rent: ${result.rent}</p>
        `;
        searchResults.appendChild(resultCard);
      });
    } else {
      const resultCard = document.createElement('div');
      resultCard.textContent = `Sorry ! Rooms Not available`;
      searchResults.appendChild(resultCard);
    }

    // Show the modal with search results
    showModal();
  } catch (error) {
    console.error('Error occurred during search:', error);
  }
}

// Function to show the modal
function showModal() {
  const modal = document.getElementById('searchModal');
  modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById('searchModal');
  modal.style.display = 'none';
}

// Event listener for Enter key press
document.getElementById('searchInput').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    searchData();
  }
});


