import requests
from flask import Flask, request, jsonify, send_from_directory
from datetime import *; 
from dateutil.relativedelta import *

app = Flask(__name__, static_url_path='/static')

# Replace these with your actual API keys
FINNHUB_API_KEY = 'cn58g2pr01qocjm1h3vgcn58g2pr01qocjm1h400'
POLYGON_API_KEY = 'uG0_5wUbBaeb3LLpkRECr5XhErRJobLY'
today = date.today()
start = today + relativedelta(months=-6, days=-1)
newsdatestart = today + relativedelta(days=-30)

print(start)


@app.route('/')
def index():
    return send_from_directory('static', 'sl64.html')

@app.route('/readiness_check')
def readiness_check():
    # Check if the application is ready to serve traffic
    # Return a successful response (200 OK) if ready, or an error response if not
    return jsonify({"status": "ok"})




@app.route('/company')
def company():
    symbol = request.args.get('symbol')

    if not symbol:
        return jsonify({"error": "Please provide a valid stock ticker"}), 400

    company_url = f'https://finnhub.io/api/v1/stock/profile2?symbol={symbol}&token={FINNHUB_API_KEY}'
    company_response = requests.get(company_url)
    company_data = company_response.json()
    companyresult = {
        "symbol": symbol,
        "company_data": company_data
    }
    return jsonify(companyresult)

@app.route('/summary')
def summary():
    symbol = request.args.get('symbol')

    if not symbol:
        return jsonify({"error": "Please provide a valid stock ticker"}), 400

    summary_url = f'https://finnhub.io/api/v1/quote?symbol={symbol}&token={FINNHUB_API_KEY}'
    summary_response = requests.get(summary_url)
    summary_data = summary_response.json()
    summaryresult = {
        "symbol": symbol,
        "summary_data": summary_data
    }
    return jsonify(summaryresult)


@app.route('/recommendation')
def recommendation():
    symbol = request.args.get('symbol')

    if not symbol:
        return jsonify({"error": "Please provide a valid stock ticker"}), 400
    
    recommendation_url = f'https://finnhub.io/api/v1/stock/recommendation?symbol={symbol}&token={FINNHUB_API_KEY}'
    recommendation_response = requests.get(recommendation_url)
    recommendation_data = recommendation_response.json()
    recommendationresult = {
        "symbol": symbol,
        "recommendation_data": recommendation_data
    }
    return jsonify(recommendationresult)

@app.route('/chartdata')
def chartdata():
    symbol = request.args.get('symbol')

    if not symbol:
        return jsonify({"error": "Please provide a valid stock ticker"}), 400

    chartdata_url = f'https://api.polygon.io/v2/aggs/ticker/{symbol}/range/1/day/{start}/{today}?adjusted=true&sort=asc&apiKey={POLYGON_API_KEY}'
    chartdata_response = requests.get(chartdata_url)
    chartdata_data = chartdata_response.json()
    chartdataresult = {
        "symbol": symbol,
        "chartdata_data" : chartdata_data
    }

    return jsonify(chartdataresult)

@app.route('/news')
def news():
    symbol = request.args.get('symbol')

    if not symbol:
        return jsonify({"error": "Please provide a valid stock ticker"}), 400

    news_url = f'https://finnhub.io/api/v1/company-news?symbol={symbol}&from={newsdatestart}&to={today}&token={FINNHUB_API_KEY}'
    news_response = requests.get(news_url)
    news_data = news_response.json()
    newsresult = {
        "symbol": symbol,
        "news_data" : news_data
    }

    return jsonify(newsresult)



if __name__ == '__main__':
    app.run(debug=True)