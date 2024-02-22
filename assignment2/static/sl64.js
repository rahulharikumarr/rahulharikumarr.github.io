document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('.nav');
    var storedData = null;


    
    function handleSearch(event) {
        var symbol = document.getElementById('search').value;

        if (symbol.trim() !== '') {
            event.preventDefault();
            Promise.all([
                fetch(`/summary?symbol=${symbol}`).then(response => response.json()),
                fetch(`/recommendation?symbol=${symbol}`).then(response => response.json()),
                fetch(`/company?symbol=${symbol}`).then(response => response.json()),
                fetch(`/chartdata?symbol=${symbol}`).then(response => response.json()),
                fetch(`/news?symbol=${symbol}`).then(response => response.json())
            ])
                .then(([summaryData, recommendationData, companyData, chartData, newsData]) => {
                    if (
                        isEmpty(summaryData.summary_data) ||
                        isEmpty(recommendationData.recommendation_data) ||
                        isEmpty(companyData.company_data) ||
                        isEmpty(chartData.chartdata_data) ||
                        isEmpty(newsData.news_data)
                    ) {
                        throw new Error('Error: No record has been found. Please enter a valid stock symbol');
                    }

                    console.log(summaryData);
                    console.log(recommendationData);
                    console.log(companyData);
                    console.log(chartData);
                    console.log(newsData);
                

                    storedData = {
                        summary: summaryData.summary_data,
                        recommendation: recommendationData.recommendation_data,
                        company: companyData.company_data,
                        chart: chartData.chartdata_data,
                        news: newsData.news_data
                    };


                    generateCompanyTab(
                        storedData.company.logo,
                        storedData.company.name,
                        storedData.company.ticker,
                        storedData.company.exchange,
                        storedData.company.ipo,
                        storedData.company.finnhubIndustry
                    );

                    var nav = document.querySelector('.nav');
                    nav.style.display = 'flex';

                    if (document.getElementById('error-message')) {
                        var errorDiv = document.querySelector('#error-message');
                        errorDiv.style.display = 'none';
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error.message);
                    displayErrorMessage(error.message);
                });
        } else {
            console.log('Please enter a valid stock ticker symbol.');
        }
    }


    function stockButtonClicked(event) {

        var existing_stock_parent = document.getElementById('stock_parent')

        if(!existing_stock_parent)
        {
        if (!storedData || !storedData.company) {
            console.error('Error: No company data found. Please search for a stock symbol first.');
            return;
        }
    
        var summaryData = storedData.summary;
        var recommendationData = storedData.recommendation;
        var companyData = storedData.company;
    
        var summaryticker = companyData.ticker;
        var day = summaryData.t;
        var closing = summaryData.pc;
        var opening = summaryData.o;
        var high = summaryData.h;
        var low = summaryData.l;
        var change = summaryData.d;
        var changepercent = summaryData.dp;
    
        var mostRecentData = findMostRecentData(recommendationData);
    
        if (mostRecentData) {
            var strongSell = mostRecentData.strongSell;
            var sell = mostRecentData.sell;
            var hold = mostRecentData.hold;
            var buy = mostRecentData.buy;
            var strongBuy = mostRecentData.strongBuy;
        }
    
        var tab_containers = document.querySelector('.tab-containers');
        var stock_parent = document.createElement('div');
        stock_parent.id = 'stock_parent';
        stock_parent.classList.add('company-details');
        tab_containers.appendChild(stock_parent);
    
        generateStockTab(summaryticker, day, closing, opening, high, low, change, changepercent, strongSell, sell, hold, buy, strongBuy);
    }
    }
    

    function chartButtonClicked(event) {
        var symbol = document.getElementById('search').value;

        var existingStockParent = document.getElementById('stock_parent')
        if (existingStockParent) 
        {
            existingStockParent.remove()
            console.log('should be removed hmm')
        }
        
        
    
        if (symbol.trim() !== '') {
            event.preventDefault();
    

            if (storedData && storedData.chart && storedData.chart.chartdata_data) {
                renderChart(storedData);
            } else {

                fetch(`/chartdata?symbol=${symbol}`)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error(`The API request failed, here is the status: ${response.status}`);
                        }
                    })
                    .then(data => {
                        if (!isEmpty(data.chartdata_data) && Array.isArray(data.chartdata_data.results) && data.chartdata_data.results.length > 0) {

                            storedData = {
                                ...storedData,
                                chart: data.chartdata_data
                            };
    

                            if (document.getElementById('error-message')) {
                                var errorDiv = document.querySelector('#error-message');
                                errorDiv.style.display = 'none';
                            }
    

                            renderChart(storedData);
                        } else {
                            displayErrorMessage('Error: No chart data has been found. Please enter a valid stock symbol');
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching chart data:', error.message);
                        displayErrorMessage(error.message);
                    });
            }
        } else {
            console.log('Please enter a valid stock ticker symbol.');
        }
    }
    

    function renderChart(dataWrapper) {
        var chartData = dataWrapper.chart;
    
        if (!chartData || !chartData.results || chartData.results.length === 0) {
            console.error('Error: No chart data has been found. Please enter a valid stock symbol.', chartData);
            return;
        }
    
        console.log('Rendering chart with data:', chartData);
    
        
        chartData.results.sort((a, b) => a.t - b.t);
    
        var dates = chartData.results.map(entry => new Date(entry.t));
        var stockPrices = chartData.results.map(entry => [entry.t, entry.c]);
        var volumes = chartData.results.map(entry => [entry.t, entry.v]);
    
        console.log(dates);
        console.log(stockPrices);
        console.log(volumes);
    
        var chartContainer = document.getElementById('chart-container');
        if (!chartContainer) {
            chartContainer = document.createElement('div');
            chartContainer.id = 'chart-container';
            var tabContainers = document.querySelector('.tab-containers');
            tabContainers.appendChild(chartContainer);
        }
    
        
        var today = new Date();
        var formattedDate = today.toISOString().split('T')[0];
    
        
        var maxVolume = Math.max(...volumes.map(entry => entry[1]));
    
        Highcharts.stockChart('chart-container', {
            chart: {
                zoomType: 'x',
                events: {
                    load: function () {
                      
                        var sixMonthsAgo = new Date();
                        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                        this.xAxis[0].setExtremes(sixMonthsAgo.getTime(), today.getTime());
                    }
                }
            },
            title: {
                text: 'Stock Price ' + storedData.company.ticker + ' '+ formattedDate,
                style: {
                    color: '#000000' 
                }
            },
            subtitle: {
                text: 'Source: <a href="https://polygon.io/" target="_blank" style="color: purple; text-decoration: underline; cursor: pointer;">Polygon.io</a>',
                style: {
                    color: 'purple',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                }
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    day: '%e %b',
                    week: '%e %b',
                    month: '%b'
                },
                //the bit that sets the width of the graph to cover the whole chart x-axis and not leave whitespace.
                min: chartData.results[0].t,
                max: chartData.results[chartData.results.length - 1].t
            },
            
            yAxis: [
                {
                    title: {
                        text: 'Stock Price'
                    },
                    labels: {
                        format: '{value}'
                    },
                    opposite: false,
                    min: 160
                },
                {
                    title: {
                        text: 'Volume'
                    },
                    labels: {
                        formatter: function () {
                            return Highcharts.numberFormat(this.value / 1e6, 0) + 'M';
                        }
                    },
                    opposite: true,
                    max: maxVolume,
                    tickInterval: 60e6
                }
            ],
            rangeSelector: {
                buttons: [
                    {
                        type: 'day',
                        count: 7,
                        text: '7d'
                    },
                    {
                        type: 'day',
                        count: 15,
                        text: '15d'
                    },
                    {
                        type: 'month',
                        count: 1,
                        text: '1m'
                    },
                    {
                        type: 'month',
                        count: 3,
                        text: '3m'
                    },
                    {
                        type: 'month',
                        count: 6,
                        text: '6m'
                    }
                ],
                selected: 2 
            },
            plotOptions: {
                area: {
                    fillColor: { //used for making the gradietn effect as required
                        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                        stops: [
                            [0, '#5bb2f5'], 
                            [1, '#ffffff']  
                        ]
                    },
                    fillOpacity: 0.3, 
                    lineWidth: 2, 
                    lineColor: '#0390fc', 
                    dashStyle: 'Solid' 
                },
                column: {
                    color: 'black', 
                    pointWidth: 5
                }
            },
            series: [
                {
                    name: 'Stock Price',
                    data: stockPrices,
                    yAxis: 0,
                    type: 'area',
                    tooltip: {
                        valueDecimals: 2
                    }
                },
                {
                    name: 'Volume',
                    data: volumes,
                    yAxis: 1,
                    type: 'column', 
                    tooltip: {
                        valueDecimals: 0
                    }
                }
            ],
        });
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


        var existingCompanyParent = document.getElementById('company_parent');
        if (existingCompanyParent) {
        existingCompanyParent.remove();
        }
        if (!document.getElementById('error-message')) {


            var company_parent = document.createElement('div');
            company_parent.id = 'company_parent';
            company_parent.classList.add('company-details'); 
            var tab_containers = document.querySelector('.tab-containers')
            tab_containers.appendChild(company_parent);
    

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


    function generateStockTab(symbol, day, closing, opening, high, low, change, percent, strongsell, sell, hold, buy, strongbuy)
    {
        if (document.getElementById('company_parent'))
        {
            var existing_company_parent = document.getElementById('company_parent')
            if (existing_company_parent) 
                {
                existing_company_parent.remove();
                }
        }

        var stock_parent = document.createElement('div');
        stock_parent.id = 'stock_parent';
        stock_parent.classList.add('company-details');
        var tab_containers = document.querySelector('.tab-containers')
        tab_containers.appendChild(stock_parent);

        //adding the ticker symbol
        var ticker_div = document.createElement('div')
        ticker_div.id = 'stock_element_container'
        ticker_div.style.borderTop = 'solid 0.2px grey'
        var ticker_paragraph = document.createElement('p');
        ticker_paragraph.textContent = `Stock Ticker Symbol: ${symbol}`;
        ticker_paragraph.style.fontWeight = 'bold';
        stock_parent.appendChild(ticker_div)
        ticker_div.appendChild(ticker_paragraph)

        //adding the trading day
        var day_div = document.createElement('div')
        day_div.id = 'stock_element_container'
        var day_epoch = parseInt(day); 
        var formattedDate = epochToDate(day);
        var day_paragraph = document.createElement('p');
        day_paragraph.textContent = `Trading Day: ${formattedDate}`;
        day_paragraph.style.fontWeight = 'bold';
        stock_parent.appendChild(day_div)
        day_div.appendChild(day_paragraph)

        //adding previous closing price div
        var previous_div = document.createElement('div')
        previous_div.id = 'stock_element_container'
        var previous_paragraph = document.createElement('p');
        previous_paragraph.textContent = `Previous Closing Price: ${closing}`
        previous_paragraph.style.fontWeight = 'bold';
        stock_parent.appendChild(previous_div)
        previous_div.appendChild(previous_paragraph)

        //adding opening price div
        var opening_div = document.createElement('div')
        opening_div.id = 'stock_element_container'
        var opening_paragraph = document.createElement('p');
        opening_paragraph.textContent = `Opening Price: ${opening}`
        opening_paragraph.style.fontWeight = 'bold';
        stock_parent.appendChild(opening_div)
        opening_div.appendChild(opening_paragraph)

        //adding high price div
        var high_div = document.createElement('div')
        high_div.id = 'stock_element_container'
        var high_paragraph = document.createElement('p');
        high_paragraph.textContent = `High Price: ${high}`
        high_paragraph.style.fontWeight = 'bold';
        stock_parent.appendChild(high_div)
        high_div.appendChild(high_paragraph)

        //adding low price div
        var low_div = document.createElement('div')
        low_div.id = 'stock_element_container'
        var low_paragraph = document.createElement('p');
        low_paragraph.textContent = `Low Price: ${low}`
        low_paragraph.style.fontWeight = 'bold';
        stock_parent.appendChild(low_div)
        low_div.appendChild(low_paragraph)

        //adding change price div
        var change_div = document.createElement('div')
        change_div.id = 'stock_element_container'
        var change_paragraph = document.createElement('p');
        change_paragraph.textContent = `Change: ${change}`
        change_paragraph.style.fontWeight = 'bold';
        var imgElement = document.createElement('img');
        if(change>0)
        {
            imgElement.src = 'static/images/GreenArrowUp.png'
        }
        else {
            imgElement.src = 'static/images/RedArrowDown.png'
        }
        imgElement.alt = 'Company Logo';
        imgElement.style.width = '15px';
        imgElement.style.height = '15px';
        stock_parent.appendChild(change_div)
        change_div.appendChild(change_paragraph)
        change_div.appendChild(imgElement)

        //adding change percent div
        var percent_div = document.createElement('div')
        percent_div.id = 'stock_element_container'
        var percent_paragraph = document.createElement('p');
        percent_paragraph.textContent = `Change Percent: ${percent}`
        percent_paragraph.style.fontWeight = 'bold';
        var percentImgElement = document.createElement('img');
        if(percent>0)
        {
            percentImgElement.src = 'static/images/GreenArrowUp.png'
        }
        else {
            percentImgElement.src = 'static/images/RedArrowDown.png'
        }
        percentImgElement.alt = 'Company Logo';
        percentImgElement.style.width = '15px';
        percentImgElement.style.height = '15px';
        stock_parent.appendChild(percent_div)
        percent_div.appendChild(percent_paragraph)
        percent_div.appendChild(percentImgElement)

        //creating the recommendations bit
        //main div holder
        var recommendations_div = document.createElement('div')
        stock_parent.appendChild(recommendations_div)
        recommendations_div.id = 'stock_element_container'
        recommendations_div.style.border = 'none'
        //adding in our multiple divs
        var div1 = document.createElement('div')
        div1.style.display = 'flex'
        div1.style.flexDirection = 'column'
        divstrong = document.createElement('p')
        divstrong.textContent = 'Strong'
        divsell = document.createElement('p')
        divsell.textContent = 'Sell'
        div1.appendChild(divstrong)
        div1.appendChild(divsell)
        div1.style.marginRight = '10px'

        var div2 = document.createElement('div')
        var div3 = document.createElement('div')
        var div4 = document.createElement('div')
        var div5 = document.createElement('div')
        var div6 = document.createElement('div')
        var div7 = document.createElement('div')
        div7.style.display = 'flex'
        div7.style.flexDirection = 'column'
        divStrong = document.createElement('p')
        divStrong.textContent = 'Strong'
        divBuy = document.createElement('p')
        divBuy.textContent = 'Sell'
        div7.appendChild(divStrong)
        div7.appendChild(divBuy)
        div7.style.marginLeft = '10px'
        recommendations_div.appendChild(div1)
        recommendations_div.appendChild(div2)
        div2.id = 'div-2'
        div2.classList.add('recommendation-div')
        div2.textContent = strongsell
        recommendations_div.appendChild(div3)
        div3.id = 'div-3'
        div3.classList.add('recommendation-div')
        div3.textContent = sell
        recommendations_div.appendChild(div4)
        div4.id = 'div-4'
        div4.classList.add('recommendation-div')
        div4.textContent = hold
        recommendations_div.appendChild(div5)
        div5.id = 'div-5'
        div5.classList.add('recommendation-div')
        div5.textContent = buy
        recommendations_div.appendChild(div6)
        div6.id = 'div-6'
        div6.classList.add('recommendation-div')
        div6.textContent = strongbuy
        recommendations_div.appendChild(div7)

        //adding the final recommendation trends text at the bottom
        var text_div = document.createElement('div')
        text_div.style.display = 'flex'
        text_div.style.justifyContent = 'center'
        text_div.style.alignItems = 'center'
        var text = document.createElement('p')
        text.style.fontSize = '25px'
        text.style.fontFamily = 'Roboto, sans-serif';
        text.style.fontWeight = '10'
        text.style.letterSpacing = '1px'
        text.textContent = 'Recommendation Trends'
        stock_parent.appendChild(text_div)
        text_div.appendChild(text)

    }

    function generateNewsCards(data) {
        // Remove existing company parent if it exists
        if (document.getElementById('company_parent')) {
            var existingCompanyParent = document.getElementById('company_parent');
            if (existingCompanyParent) {
                existingCompanyParent.remove();
            }
        }
    
        // Create a new news container
        var newsContainer = document.createElement('div');
        newsContainer.id = 'news-container';
        var tabContainers = document.querySelector('.tab-containers');
        tabContainers.appendChild(newsContainer);
    
        // Filter valid news data
        const validNewsData = data.news.filter(entry =>
            entry.image && entry.headline && entry.datetime && entry.url
        );
    
        // Get the first five valid news entries
        const firstFiveValidNews = validNewsData.slice(0, 5);
    
        // Iterate over each valid news entry and create a card
        firstFiveValidNews.forEach(entry => {
            var newsCard = document.createElement('div');
            newsCard.classList.add('news-card');
    
            // Create an image element
            var newsImg = document.createElement('img');
            newsImg.src = entry.image;
            newsImg.id = 'news-image';
            newsCard.appendChild(newsImg);
    

            var newsRightContainer = document.createElement('div');
            newsRightContainer.id = 'news-right-container';
    
            // Create a title element
            var newsTitle = document.createElement('div');
            newsTitle.textContent = entry.headline;
            newsTitle.style.fontWeight = 'bold';
            newsTitle.style.paddingTop = '10px'
    
            // Create a date element
            var newsDate = document.createElement('div');
            var formattedDate = new Date(entry.datetime * 1000).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
            newsDate.textContent = formattedDate;
    
            // Create a hyperlink for the original post
            var newsLink = document.createElement('a');
            newsLink.textContent = 'See Original Post';
            newsLink.href = entry.url;
            newsLink.target = '_blank';
            newsLink.style.color = 'blue'; 
    
            newsRightContainer.appendChild(newsTitle);
            newsRightContainer.appendChild(newsDate);
            newsRightContainer.appendChild(newsLink);
    

            newsCard.appendChild(newsRightContainer);
            newsContainer.appendChild(newsCard);
        });
    }
    
    
    //code snippet taken using help of https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
    function epochToDate(epoch) {
    const date = new Date(epoch * 1000);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
    }

var searchButton = document.getElementById('search-button');
if (searchButton) {
    searchButton.addEventListener('click', function(event) {
        handleSearch(event);
    });
}

    //for buttons to be "active"
    var companyButton = document.getElementById('company-button');
    var stockButton = document.getElementById('stock-button');
    var chartButton = document.getElementById('chart-button');
    var newsButton = document.getElementById('news-button');

    if (companyButton) {
        companyButton.classList.add('active-button');
    }

    function buttonClicked(event) {
        var buttons = document.querySelectorAll('.nav-element')
        buttons.forEach(button => button.classList.remove('active-button'))
        event.target.classList.add('active-button')
    }

    function findMostRecentData(recommendationData) {
        // Sort the array in descending order based on the 'period' field
        const sortedData = recommendationData.sort((a, b) => new Date(b.period) - new Date(a.period));
    
        // Return the first (most recent) element
        return sortedData[0];
    }


    if (companyButton) {
        companyButton.addEventListener('click', buttonClicked);
        companyButton.addEventListener('click', generateCompanyTab);
        
    }
    if (stockButton) {
        stockButton.addEventListener('click', buttonClicked);
        stockButton.addEventListener('click', stockButtonClicked);
    }
    if (chartButton) {
        chartButton.addEventListener('click', buttonClicked);
        chartButton.addEventListener('click', chartButtonClicked);
    }
    if (newsButton) {
        newsButton.addEventListener('click', buttonClicked)
        newsButton.addEventListener('click', function() {
            generateNewsCards(storedData);
        });
    }

});