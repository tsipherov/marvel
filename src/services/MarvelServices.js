import { useFetch } from "../hooks/useFetch";
const MarvelServices = () => {
  const _baseUrl = "https://gateway.marvel.com:443/v1/public";

  const _apiKey = "f8a65e3990fbc2d46c94383226ba6e91";

  const limit = 9;

  const { loading, request, error, clearError } = useFetch();

  const getAllCharacters = async (offset = 0) => {
    const url = `${_baseUrl}/characters?offset=${offset}&limit=${limit}&apikey=${_apiKey}`;
    const result = await request(url);
    return result.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const url = `${_baseUrl}/characters/${id}?apikey=${_apiKey}`;
    const result = await request(url);
    return _transformCharacter(result.data.results[0]);
  };

  const getAllComics = async () => {
    const url = `${_baseUrl}/comics?apikey=${_apiKey}`;
    const result = await request(url);
    return result.data.results.map(_transformComics);
  };

  const _transformCharacter = (data) => {
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

  const _transformComics = (data) => {
    const { title, description, thumbnail, id } = data;
    return {
      id,
      title,
      description: description || "There is no description for this character",
      imgUrl: `${thumbnail.path}.${thumbnail.extension}`,
      // homepage: urls[0].url,
      // wiki: urls[1].url,
      // comics: comics.items,
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    getAllComics,
    clearError,
  };
};

export default MarvelServices;
