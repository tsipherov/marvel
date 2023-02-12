class MarvelServices {
  baseUrl = "https://gateway.marvel.com:443/v1/public/";

  apiKey = "f8a65e3990fbc2d46c94383226ba6e91";

  getResource = async (url) => {
    const combineUrl = `${this.baseUrl}${url}?apikey=${this.apiKey}`;
    console.log("combineUrl: ", combineUrl);
    const res = await fetch(combineUrl);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }
    return await res.json();
  };

  getAllCharacters = () => {
    return this.getResource(this.baseUrl);
  };

  getCharacter = (id) => {
    return this.getResource(`characters/${id}`);
  };
}

export default MarvelServices;
