import { useState, useEffect } from 'react'
import { ImageDetailModal } from './components/ImageDetailModal'

import './App.css'

const App = () => {
  const [breeds, setBreeds] = useState<string[]>([])
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null)
  const [selectedBreedImg, setSelectedBreedImg] = useState<string | null>(null)
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
      setBreeds(parseBreeds(data.message))
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
  
  useEffect(() => {
    fetchDogsBreeds()
  }, [])
  
  return (
    <div className='container m-auto py-10'>
      <h1 className='text-3xl'>Dogs list</h1>
      <ul className='mt-2'>
        {breeds?.map(breed => <li className='border-b border-b-black-100 mb-2 py-1 text-lg cursor-pointer transition-colors duration-300 last:border-0 hover:text-green-600 hover:underline hover:underline-green-600' key={breed} onClick={()=> showRandomBreedImage(breed)}>{breedKeyToString(breed)}</li>)}
      </ul>
      
      {selectedBreedImg && <ImageDetailModal imageUrl={selectedBreedImg} imageAlt={`A picture of a ${selectedBreed} dog`} isLoading={isLoading} />}
    </div>
  )
}

export default App
