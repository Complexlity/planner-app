
async function getRandomQuote(url) {
  // let url = `https://api.api-ninjas.com/v1/quotes?category=${category}&limit=10`;
  let data = await fetch(url, {
    method: "GET",
    headers: { "X-Api-Key": import.meta.env.VITE_QUOTE_API_KEY },
  });
  if (!data.ok)
    return "I am some random quote added here because the api returned an error";
  let res = await data.json();
  const quotes = res.map(item => item.quote)
  return quotes
}

export { getRandomQuote}
