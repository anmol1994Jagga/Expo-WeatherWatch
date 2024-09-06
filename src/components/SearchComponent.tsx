import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SearchComponent = ({ search, setSearch, locations, selectLocation, handleSearch }: any) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const onSearch = () => {
        handleSearch();
        setShowDropdown(true);
    }
    const onSelectinglocation = (loc: any) => {
        setShowDropdown(false);
        selectLocation(loc)
    }
    return (
        <>
            <TextInput
                placeholder="Search location"
                placeholderTextColor={"lightgray"}
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
            />
            <Button title="Search" onPress={onSearch} />
            {showDropdown &&
                <View style={styles.dropdownContainer}>
                    {locations?.map((loc: any) => {
                        return (
                            <TouchableOpacity
                                key={loc.id}
                                style={styles.location}
                                onPress={() => onSelectinglocation(loc)}>
                                <Text accessibilityRole={'button'}>{loc?.name}, {loc?.country}</Text>
                            </TouchableOpacity>)
                    })}
                </View>
            }
        </>
    );
};

const styles = StyleSheet.create({
    searchcontainer: {
        padding: 10,
    },
    dropdownContainer: {
        position: 'absolute',
        top: 55, // Adjust this value as needed
        left: 20,
        right: 20,
        borderWidth: 1,
        zIndex: 100, // Higher z-index to stay above other elements
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // For Android shadow
    },
    searchInput: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10
    },
    location: {
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderColor:'grey',
        zIndex:100
    }
});

export default SearchComponent;
