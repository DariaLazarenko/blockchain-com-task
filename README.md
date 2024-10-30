# Blockchain.con frontend take-home test

This Next.js application allows you to view the predefined list of cryptocurrencies with key data like price and 24h price change. You can also navigate to each coin's page to view more details like 24h high and low prices, which are fetched and updated in real time from CoinGecko API.

The project is deployed on Vercel and you can access it here: [blockchain-com-task.vercel.app](https://blockchain-com-task.vercel.app)

## How to run a project locally

You can do it by following these steps:
1. Clone the project from this GitHub repo.
2. Create `.env.local` file using `.env.template` as a template by running this command: 
    ```bash
    cp .env.template .env.local
    ```
3. Make sure that you have a valid CoinGecko API key. If you don't have one, here is a detailed guide on how to create it: [How to create Demo API key](https://support.coingecko.com/hc/en-us/articles/21880397454233-User-Guide-How-to-sign-up-for-CoinGecko-Demo-API-and-generate-an-API-key)
4. Insert this API key as a value for `COINGECKO_API_KEY` in created earlier `.env.local` file
5. Run this command to install all necessary dependencies:
    ```bash
    npm install
    ```
6. After all the dependencies have successfully installed run this command to build and run this application:
    ```bash
    npm run build && npm start
    ```
7. Finally, open [http://localhost:3000](http://localhost:3000) with your browser to open the app.

## App overview

The App has two main pages: static coin list page and dynamic coin details page for specific coins. I have used CoinGecko API for data fetching with a demo API key.

### Coin list page

For the coin list page, I've used SSR to prefetch the data on the server. The fetch request to CoinGecko is revalidated every 60 seconds to ensure data accuracy.

### Coin details page

For the coin details page, I have also used SSR to prefetch initial data. The page is regenerated on each reload because it is a dynamic route.

Even thought it wasn't stated in the requirements for the task, I decided to add the feature of auto coin data update every 60 seconds. To achieve this, I used a client component for live data updates with `UseEffect` React hook. I think it is quite useful for monitoring coin prices.

### Code structure

I have implemented a simple code structure that organises core components, models, etc. into dedicated folders which suits small projects like this one. 
This structure provides modularity, making the codebase organised and scalable.

### Design

For the app design, I used a Tailwind CSS library and mobile-first approach. This helps to keep the app responsive for all types of devices.

### Tests

Additionally, I added unit tests for key functions. You can find them in `/tests` directory. To run tests use this command: `npm test`.
