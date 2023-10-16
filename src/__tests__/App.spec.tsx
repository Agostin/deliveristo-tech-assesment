import '@testing-library/jest-dom'
import { render, screen, act, RenderOptions } from "@testing-library/react"
import App from "../App"
import { parseBreeds } from '../utils/functions';

interface IResponse {
  status: 'success' | 'error';
  message: Record<string, string[]> | string
}

global.fetch = jest.fn(async () =>
  Promise.resolve({
    status: 200,
    json: async () => Promise.resolve<IResponse>({ status: 'success', message: {} })
  })
) as jest.Mock;

describe('App', () => {
  let container: HTMLElement | null;
  
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container as HTMLElement);
    container = null;
  });

  test("it should render the main page", async () => {
    await act(() => render(<App />))
    
    expect(screen.getByText(/Dogs List/)).toBeInTheDocument()
  })

  test("it should render the dog's breeds list", async () => {
    const MOCK_DATA = {
      "affenpinscher": [],
      "australian": [
        "shepherd"
      ],
      "spaniel": [
        "cocker"
      ]
    }

    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: async () => Promise.resolve<IResponse>({ status: 'success', message: MOCK_DATA })
        })
        ) as jest.Mock);
        
        await act(async () => {
          render(<App />, container as RenderOptions);
        });
        
    expect(screen.getAllByTestId('dogs-breed-wrapper')).toHaveLength(parseBreeds(MOCK_DATA).length);
    expect(container).toMatchSnapshot();
  })

  it('should render an error message when it has issues retrieving data from API', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(jest.fn(() =>
        Promise.resolve({
          status: 500,
          json: async () => Promise.resolve<IResponse>({ status: 'error', message: 'Mocked error message' })
        })
      ) as jest.Mock);
  
    await act(async () => {
      render(<App />, container as RenderOptions);
    });

    expect(screen.getByTestId('error-wrapper')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  })
})