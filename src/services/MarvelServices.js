import { useFetch } from "../hooks/useFetch";
const _baseUrl = process.env.REACT_APP_BASE_URL;
const _apiKey = process.env.REACT_APP_API_KEY;
const MarvelServices = () => {
  const charLimit = 30;
  const comicsLimit = 30;

  const { request, clearError, process, setProcess } = useFetch();

  const getAllCharacters = async (offset = 0) => {
    const url = `${_baseUrl}/characters?offset=${offset}&limit=${charLimit}&apikey=${_apiKey}`;
    const response = await request(url);
    const result = response.data.results.filter(
      (item) => !item.thumbnail.path.endsWith("image_not_available")
    );
    console.log("result >>>> ", result);
    return result.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const url = `${_baseUrl}/characters/${id}?apikey=${_apiKey}`;
    const result = await request(url);
    return _transformCharacter(result.data.results[0]);
  };

  const getCharacterByName = async (name) => {
    const url = `${_baseUrl}/characters?name=${name}&apikey=${_apiKey}`;
    const result = await request(url);
    return result.data.results.map(_transformCharacter);
  };

  const getAllComics = async (offset = 0) => {
    const url = `${_baseUrl}/comics?offset=${offset}&limit=${comicsLimit}&apikey=${_apiKey}`;
    const response = await request(url);
    const result = response.data.results.filter(
      (item) => !item.thumbnail.path.endsWith("image_not_available")
    );

    return result.map(_transformComics);
  };

  const getComic = async (id) => {
    const url = `${_baseUrl}/comics/${id}?apikey=${_apiKey}`;
    const result = await request(url);
    console.log("original data >>> ", result.data.results[0]);
    return _transformComics(result.data.results[0]);
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
    const {
      title,
      description,
      thumbnail,
      id,
      prices,
      pageCount,
      textObjects,
    } = data;
    return {
      id,
      title,
      price: prices[0].price ? `${prices[0].price}$` : "not available",
      description: description || "There is no description",
      imgUrl: `${thumbnail.path}.${thumbnail.extension}`,
      pageCount: pageCount
        ? `${pageCount} pages.`
        : "No information about the number of pages",
      language: textObjects[0]?.language || "en-us",
    };
  };

  return {
    clearError,
    process,
    setProcess,
    getAllCharacters,
    getCharacterByName,
    getCharacter,
    getAllComics,
    getComic,
  };
};

export default MarvelServices;
