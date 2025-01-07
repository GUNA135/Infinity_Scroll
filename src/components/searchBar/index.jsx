import React from 'react'
import './css/SearchBar.css'

const SearchBar = (props) => {
  const {className}=props
  return (
    <div className='search-bar-parent-container'>
      <input className={`search-bar-input ${className}`} {...props}/>
    </div>
  )
}

export default React.memo(SearchBar)