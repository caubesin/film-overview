import React, {useState} from 'react';
import DownShift from 'downshift';
import axios from 'axios';
import './css/search.css';

function SearchInput(props) {
    const [items,setItem] = useState([]);
    const [value,setValue] = useState('');
    return (
        <DownShift onChange = {selection => {
            props.axiosMoviesId(selection.id);
        }} itemToString = {item => (item ? item.value : '')}>
            {({getInputProps, getItemProps, getLabelProps, getMenuProps, isOpen, inputValue, highlightedIndex, selectedItem, getRootProps}) => {
                return(
                <div className="search">
                    <div className = 'search-input' style = {{display: 'inline-block'}} {...getRootProps({},{suppressRefError: true})}>
                        <input type ='text' value = {value} placeholder ='Search the movie...' {...getInputProps({
                            onChange : event => {
                                setValue(event.target.value);
                                axios
                                    .get(`https://api.themoviedb.org/3/search/movie?api_key=32cd16f037bba76b28b59eee2f1cd7a3&query=${event.target.value}`)
                                    .then(response =>{
                                        setItem(response.data.results);
                                    })
                                    .catch(error => console.error(error))
                            }
                        })} />
                    </div>
                    <ul {...getMenuProps()} className='list-suggest'>
                        {isOpen ? items
                            .map((item, index) =>{
                                return(<li {...getItemProps({key : item.id, index, item, style: {
                                    backgroundColor: highlightedIndex === index ? 'var(--color-font-special)' : '',
                                    fontWeight: selectedItem === item ? 'bold' : 'normal',
                                    fontSize: '17px',
                                  },})}>
                                      {item.title}
                                </li>)
                            })
                        : null}
                    </ul>
                </div>)
            }}
        </DownShift>
    )
}

export default SearchInput;