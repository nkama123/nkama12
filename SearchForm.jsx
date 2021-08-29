import React, {useState}from 'react';

const SearchForm = ({searchText}) => {
    const [text,setText]= useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        searchText(text)
    }

    

   



    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <input type="text" placeholder ="e.g politics" className="py-3 px-3 rounded-l-2g" onChange={(e) => setText(e.target.value)}/>
                <button type ="submit" className="bg-green-400 py-3 px-3 rounded-r-2g ">Search</button>
            </form>
            
        </div>
    )
}

export default SearchForm
