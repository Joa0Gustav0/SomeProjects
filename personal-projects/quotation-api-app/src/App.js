function App() {
  return (
    <div className="App">
      <button onClick={async () => {

        await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&")
        .then(data => data.json())
        .then(data => console.log(data))

      }}>Try it!</button>
    </div>
  );
}

export default App;
