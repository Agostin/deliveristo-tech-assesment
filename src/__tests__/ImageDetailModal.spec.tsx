import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import { ImageDetailModal } from "../components/ImageDetailModal"

describe('ImageDetailModal', () => {
  test('it should render the empty component', () => {
    render(<ImageDetailModal imageAlt={''} imageUrl={''} isLoading={false} />)
    
    const wrapper = screen.getByTestId('ImageDetailModal-wrapper')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper).toHaveClass('flex inset-0 justify-center items-center m-auto bg-black/40 hidden')
  })
  
  test('it should render component filled up with an image', () => {
    render(<ImageDetailModal imageAlt={''} imageUrl={'some-mocked-image-resource'} isLoading={false} />)
    
    const imgWrapper = document.querySelector('img') as HTMLImageElement
    expect(imgWrapper).toBeInTheDocument()
    expect(imgWrapper.src).toContain('some-mocked-image-resource')
    expect(document.querySelector('.animate-spin')).not.toBeInTheDocument()
  })
  
  test('it should show a loader when "isLoading" is true', () => {
    render(<ImageDetailModal imageAlt={''} imageUrl={'some-mocked-image-resource'} isLoading={true} />)
    
    expect(document.querySelector('.animate-spin')).toBeInTheDocument()
    expect(document.querySelector('img')).not.toBeInTheDocument()
  })
})