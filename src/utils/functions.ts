const breedKeyToString = (key: string) => {
  const baseString = key.replace(/[/-]/g, ' ').trim()
  return baseString.charAt(0).toUpperCase() + baseString.slice(1).toLowerCase()
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

export { breedKeyToString, parseBreeds }