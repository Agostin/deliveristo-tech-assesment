import { useState, useEffect } from 'react'
import { ImageDetailModal } from './components/ImageDetailModal'

import './App.css'

const App = () => {
  const [breeds, setBreeds] = useState<string[]>([])
  const [filteredBreeds, setFilteredBreeds] = useState<string[]>([])
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null)
  const [selectedBreedImg, setSelectedBreedImg] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  
  const API_BASE_PATH = 'https://dog.ceo/api';

  const breedKeyToString = (key: string) => {
    const baseString = key.replace(/\//g, ' ')
    return baseString.charAt(0).toUpperCase() + baseString.slice(1)
  }

  const parseBreeds = (breedsMap: Record<string, string[]>) => {
    let breeds: string[] = []
    Object.keys(breedsMap).forEach((bk: string) => {
      if (!breedsMap[bk].length) breeds.push(bk)
      else {
        const subBreeds = breedsMap[bk].flatMap((sbk: string) => `${bk}/${sbk}`)
        breeds = breeds.concat(subBreeds)
      }
    });

    return breeds
  }

  const fetchDogsBreeds = async () => {
    const response = await fetch(`${API_BASE_PATH}/breeds/list/all`)
    const data = await response.json()

    if (response.status === 200 && data.status === 'success') {
      const list = parseBreeds(data.message)
      setBreeds(list)
      setFilteredBreeds(list)
    } else {
      setError(data.message)
    }
  }

  const showRandomBreedImage = async (breed: string) => {
    setIsLoading(true)
    const response = await fetch(`${API_BASE_PATH}/breed/${breed}/images/random`)
    const data = await response.json()
    
    if (response.status === 200 && data.status === 'success') {
      setSelectedBreedImg(data.message)
      setSelectedBreed(breedKeyToString(breed))
    } else {
      setError(data.message)
    }
    setIsLoading(false)
  }

  const filterResults = (evt) => {
    const term = evt.target.value
    if (term.length > 2) {
      setFilteredBreeds(breeds.filter((b: string) => b.indexOf(term) !== -1))
    } else {
      setFilteredBreeds(breeds)
    }
  }
  
  useEffect(() => {
    fetchDogsBreeds()
  }, [])
  
  return (
    <div className='container m-auto px-4 py-10'>
      <div className='flex flex-col items-center justify-between sm:flex-row'>
        <h1 className='text-3xl w-full'>Dogs list</h1>
        <input className='rounded-md shadow-sm border border-gray-300 outline-none px-3 py-1 w-full mt-2 mb-4 sm:max-w-xs sm:m-0' type="search" placeholder='Search for a dog breed...' onChange={filterResults} />
      </div>
      <ul className='mt-2'>
        {filteredBreeds.map(breed =>
          <li className='border-b border-b-black-100 mb-2 py-1 text-xl cursor-pointer transition-colors duration-300 last:border-0 hover:text-green-600 hover:underline hover:underline-green-600' key={breed} onClick={()=> showRandomBreedImage(breed)}>
            {breedKeyToString(breed)}
          </li>
        )}
      </ul>
      
      {<ImageDetailModal imageUrl={selectedBreedImg} imageAlt={`A picture of a ${selectedBreed} dog`} isLoading={isLoading} />}
    </div>
  )
}

export default App
