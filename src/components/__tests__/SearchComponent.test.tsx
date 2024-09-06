import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchComponent from '../SearchComponent'; // Adjust the path as necessary

describe('SearchComponent', () => {
  // Mock props
  const mockSetSearch = jest.fn();
  const mockSelectLocation = jest.fn();
  const mockHandleSearch = jest.fn();

  const mockLocations = [
    { id: 1, name: 'New York', country: 'USA' },
    { id: 2, name: 'London', country: 'UK' },
  ];

  it('renders search input and search button', () => {
    const { getByPlaceholderText, getByText } = render(
      <SearchComponent
        search=""
        setSearch={mockSetSearch}
        locations={mockLocations}
        selectLocation={mockSelectLocation}
        handleSearch={mockHandleSearch}
      />
    );

    expect(getByPlaceholderText('Search location')).toBeTruthy();
    expect(getByText('Search')).toBeTruthy();
  });

  it('calls setSearch when text is entered', () => {
    const { getByPlaceholderText } = render(
      <SearchComponent
        search=""
        setSearch={mockSetSearch}
        locations={mockLocations}
        selectLocation={mockSelectLocation}
        handleSearch={mockHandleSearch}
      />
    );

    const input = getByPlaceholderText('Search location');
    fireEvent.changeText(input, 'New York');

    expect(mockSetSearch).toHaveBeenCalledWith('New York');
  });

  it('displays dropdown when search button is pressed', () => {
    const { getByText, getByRole } = render(
      <SearchComponent
        search="New"
        setSearch={mockSetSearch}
        locations={mockLocations}
        selectLocation={mockSelectLocation}
        handleSearch={mockHandleSearch}
      />
    );

    const button = getByText('Search');
    fireEvent.press(button);

    expect(mockHandleSearch).toHaveBeenCalled();
    expect(getByRole('button', { name: /new york, usa/i })).toBeTruthy();
  });

  it('calls selectLocation when a location is selected', () => {
    const { getByText } = render(
      <SearchComponent
        search="New"
        setSearch={mockSetSearch}
        locations={mockLocations}
        selectLocation={mockSelectLocation}
        handleSearch={mockHandleSearch}
      />
    );

    // Simulate pressing the search button to show the dropdown
    fireEvent.press(getByText('Search'));

    // Simulate selecting the first location
    fireEvent.press(getByText('New York, USA'));

    expect(mockSelectLocation).toHaveBeenCalledWith(mockLocations[0]);
  });
});
