'use strict';
const axios = require('axios');

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async (req, res) => {
      const { stock } = req.query;

      // Check if the stock parameter is an array or a single stock
      const stocks = Array.isArray(stock) ? stock : [stock];
      const stockDataArray = [];

      try {
        for (const stockSymbol of stocks) {
          const apiUrl = `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stockSymbol}/quote`;

          const response = await axios.get(apiUrl);
          const likes = 0; // Temporary, replace with your likes logic

          const stockData = {
            stock: response.data.symbol,
            price: parseFloat(response.data.latestPrice), // Convert to number
            likes: parseInt(likes), // Convert to number
          };

          stockDataArray.push(stockData);
        }

        // Calculate relative likes
        if (stockDataArray.length === 2) {
          const [stock1, stock2] = stockDataArray;
          stock1.rel_likes = stock1.likes - stock2.likes;
          stock2.rel_likes = stock2.likes - stock1.likes;
        }

        // Construct the response based on the number of stocks requested
        let responseData;
        if (stockDataArray.length === 1) {
          responseData = { stockData: stockDataArray[0] };
        } else {
          responseData = { stockData: stockDataArray };
        }

        res.json(responseData);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching stock data.' });
      }
    });
};
