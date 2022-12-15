import React, {
  useState,
  useEffect
} from 'react';
import PokemonList from './PokemonList'
import axios from 'axios'
import Pagination from './Pagination';

function App() {
  // this is array destructuring
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  // Every single time currentePageURL changes, rerrun the code inside it
  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken((c => cancel = c))
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })
    //this function allows clean up after
    return () => cancel()

  }, [currentPageUrl])

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }

  if (loading) return "Loading..."

  return ( <
    >
    <
    PokemonList pokemon = {
      pokemon
    }
    /> <
    Pagination gotoNextPage = {
      nextPageUrl ? gotoNextPage : null
    }
    gotoPrevPage = {
      prevPageUrl ? gotoPrevPage : null
    }
    /> <
    />
  );
}

export default App;

// We need to useeffect to make this Work. The following is incomplete

/*

function App() {
  // this is array destructuring
  const [pokemon, setPokemon] = useState([])

  axios.get("https://pokeapi.co/api/v2/pokemon").then(res => {
    setPokemon(res.data.results.map(p => p.name))
  })
  return (
    <PokemonList pokemon={pokemon}/>
  );
}
*/