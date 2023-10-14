import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import App from "../App"

test("It should render the main page", () => {
  render(<App />)
  expect(true).toBeTruthy()
})