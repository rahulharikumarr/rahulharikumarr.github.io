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
                        var img = data.company_data.logo
                        var name = data.company_data.name
                        var ticker = data.company_data.ticker
                        var exchange = data.company_data.exchange
                        var start = data.company_data.ipo
                        var category = data.company_data.finnhubIndustry
                        generateCompanyTab(img, name, ticker, exchange, start, category)

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

    function generateCompanyTab(img, name, ticker, exchange, start, category) {
        // Check if the error div already exists, if not, create and append it

        var existingCompanyParent = document.getElementById('company_parent');
        if (existingCompanyParent) {
        existingCompanyParent.remove();
        }
        if (!document.getElementById('error-message')) {

            // Create a parent div for the company details
            var company_parent = document.createElement('div');
            company_parent.id = 'company_parent';
            company_parent.classList.add('company-details');  // Add the common class
            var tab_containers = document.querySelector('.tab-containers')
            tab_containers.appendChild(company_parent);
    
            // Create an image element
            var img_div = document.createElement('div')
            img_div.id = 'company_element_container'
            var imgElement = document.createElement('img');
            company_parent.appendChild(img_div)
            imgElement.src = img;
            imgElement.alt = 'Company Logo';
            imgElement.style.width = '150px';
            imgElement.style.height = '150px';
            img_div.appendChild(imgElement)
    
            // name
            var name_div = document.createElement('div')
            name_div.id = 'company_element_container'
            var name_paragraph = document.createElement('p');
            name_paragraph.textContent = `Company Name: ${name}`;
            name_paragraph.style.fontWeight = 'bold';
            company_parent.appendChild(name_div);
            name_div.appendChild(name_paragraph)

            //ticker
            var ticker_div = document.createElement('div')
            ticker_div.id = 'company_element_container'
            var ticker_paragraph = document.createElement('p');
            ticker_paragraph.textContent = `Stock Ticker Symbol: ${ticker}`;
            ticker_paragraph.style.fontWeight = 'bold';
            company_parent.appendChild(ticker_div)
            ticker_div.appendChild(ticker_paragraph)
    
            //exchange
            var exchange_div = document.createElement('div')
            exchange_div.id = 'company_element_container'
            var exchange_paragraph = document.createElement('p');
            exchange_paragraph.textContent = `Stock Exchange Code: ${exchange}`;
            exchange_paragraph.style.fontWeight = 'bold';
            company_parent.appendChild(exchange_div);
            exchange_div.appendChild(exchange_paragraph)
    
            //start data
            var start_div = document.createElement('div')
            start_div.id = 'company_element_container'
            var start_paragraph = document.createElement('p');
            start_paragraph.textContent = `Company Start Date: ${start}`;
            start_paragraph.style.fontWeight = 'bold';
            company_parent.appendChild(start_div);
            start_div.appendChild(start_paragraph)
    
            //category
            var category_div = document.createElement('div')
            category_div.id = 'company_element_container'
            var category_paragraph = document.createElement('p');
            category_paragraph.textContent = `Category: ${category}`;
            category_paragraph.style.fontWeight = 'bold';
            company_parent.appendChild(category_div);
            category_div.appendChild(category_paragraph)
        }
    }
    

var searchButton = document.getElementById('search-button');
if (searchButton) {
    searchButton.addEventListener('click', function(event) {
        handleSearch(event);
    });
}

});
