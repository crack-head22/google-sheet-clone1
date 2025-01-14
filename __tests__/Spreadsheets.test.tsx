import { render, screen } from '@testing-library/react'
import Spreadsheet from '../components/Spreadsheet'

describe('Spreadsheet', () => {
  it('renders without crashing', () => {
    render(<Spreadsheet />)
    expect(screen.getByText('Untitled spreadsheet')).toBeInTheDocument()
  })
})

