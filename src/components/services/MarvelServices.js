class MarvelServices {
  baseUrl = "https://gateway.marvel.com:443/v1/public";

  apiKey = "f8a65e3990fbc2d46c94383226ba6e91";

  getResource = async (url = "", searchParams = {}) => {
    const search = Object.keys(searchParams).reduce((acc, key) => {
      return acc + `${key}=${searchParams[key]}&`;
    }, "");

    const combineUrl = `${this.baseUrl}${url}?${search}apikey=${this.apiKey}`;
    const res = await fetch(combineUrl);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }
    return await res.json();
  };

  getAllCharacters = async (offset = 0, limit = 9) => {
    const result = await this.getResource("/characters", { offset, limit });
    return result.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const result = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(result.data.results[0]);
  };

  _transformCharacter = (data) => {
    const { name, description, thumbnail, urls, id, comics } = data;
    return {
      id,
      name,
      description: description || "There is no description for this character",
      imgUrl: `${thumbnail.path}.${thumbnail.extension}`,
      homepage: urls[0].url,
      wiki: urls[1].url,
      comics: comics.items,
    };
  };
}

export default MarvelServices;
