import { breedKeyToString, parseBreeds } from "./functions"

describe('Utility functions', () => {
  describe('breedKeyToString function', () => {
    it('should return a readable breed label from a link-formatted one (#1)', () => {
      expect(breedKeyToString('a/link-formatted-breed/')).toBe('A link formatted breed')
    })
    it('should return a readable breed label from a link-formatted one (#2)', () => {
      expect(breedKeyToString('Another/formatted-BREED/')).toBe('Another formatted breed')
    })
    it('should return a readable breed label from a link-formatted one (#3)', () => {
      expect(breedKeyToString('tHe/LaTeSt/FoRmAtTeD/BrEeD///')).toBe('The latest formatted breed')
    })
  })
  
  describe('parseBreeds function', () => {
    const result = [
      "affenpinscher",
      "african",
      "airedale",
      "australian/shepherd",
      "spaniel/cocker",
      "spaniel/irish",
      "spaniel/welsh",
    ]

    it('should return an empty array when the input map is empty too', () => {
      expect(parseBreeds({})).toEqual([])
    })
    it('should return an array of link-formatted breeds starting from a map', () => {
      expect(parseBreeds({
        "affenpinscher": [],
        "african": [],
        "airedale": [],
        "australian": [
          "shepherd"
        ],
        "spaniel": [
          "cocker",
          "irish",
          "welsh"
        ],
      })).toEqual(result)
    })
  })
})