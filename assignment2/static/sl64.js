document.addEventListener('DOMContentLoaded', function () {

    var nav = document.querySelector('.nav');
    
    function handleSearch(event) {

        var symbol = document.getElementById('search').value;
    
        if (symbol.trim() !== '') {
            event.preventDefault();

            fetch(`/company?symbol=${symbol}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error(`The API request failed, here is the status: ${response.status}`);
                    }
                })
                .then(data => {
                    if (isEmpty(data.company_data)) {
                        displayErrorMessage(`Error: No record has been found. Please enter a valid stock symbol`);
                    } else {
                        console.log(data);
                        nav.style.display = 'flex';
                        if(document.getElementById('error-message'))
                        {
                            var errorDiv = document.querySelector('#error-message');
                            errorDiv.style.display = 'none'
                        }
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error.message);
                });
        } else {
            console.log('Please enter a valid stock ticker symbol.');
        }

        
    }
    
    function isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
    
    function displayErrorMessage(errorMessage) {

        if (!document.getElementById('error-message')) {
            var errorDiv = document.createElement('div');
            var parent = document.querySelector('.search-items');
            errorDiv.id = 'error-message';
            errorDiv.textContent = errorMessage;

            parent.appendChild(errorDiv);
        }

        if(document.getElementById('error-message'))
        {
            var errorDiv = document.getElementById('error-message')
            errorDiv.textContent = errorMessage;
        }
    }

var searchButton = document.getElementById('search-button');
if (searchButton) {
    searchButton.addEventListener('click', function(event) {
        handleSearch(event);
    });
}

});
