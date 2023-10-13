import { useState, useEffect } from 'react'
import './App.css'

const App = () => {
  const [breeds, setBreeds] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  
  const API_BASE_PATH = 'https://dog.ceo/api';

  const parseBreeds = (breedsMap: Record<string, string[]>) => {
    let breeds: string[] = []
    Object.keys(breedsMap).forEach((bk: string) => {
      if (!breedsMap[bk].length) breeds.push(bk)
      else {
        const subBreeds = breedsMap[bk].flatMap((sbk: string) => `${bk}-${sbk}`)
        breeds = breeds.concat(subBreeds)
      }
    });

    return breeds
  }

  const fetchDogsBreeds = async () => {
    const request = await fetch(`${API_BASE_PATH}/breeds/list/all`)
    const response = await request.json()

    if (response.status === 'success' && Object.keys(response.message).length) {
      setBreeds(parseBreeds(response.message))
      console.log(breeds)
    } else {
      setError(response.message)
    }
  }

  const breedKeyToString = (key: string) => {
    const baseString = key.replace(/-/g, ' ')
    return baseString.charAt(0).toUpperCase() + baseString.slice(1)
  }
  
  useEffect(() => {
    fetchDogsBreeds()
  }, [])
  
  return (
    <>
      <h1 className="text-3xl font-bold underline">Deliveristo Tech Assesment</h1>
      <ul>
        {breeds?.map(breed => <li key={breed}>{breedKeyToString(breed)}</li>)}
      </ul>
    </>
  )
}

export default App
