import React, { useRef, useState } from "react";
import "./SearchBar.css";
import Search from "@mui/icons-material/Search";
import Close from "@mui/icons-material/Close";
import { Button } from "@material-ui/core";
import { authAxios } from "../services/auth.service";
import { useEffect } from "react";

function SearchBar({ placeholder, setSearchData }) {
  const [filteredData, setFilteredData] = useState([]);
  const [searchWord, setSearchWord] = useState("")
  const [hide, setHide] = useState(true)
  const [disable, setDisable] = useState(true)
  const inputRef = useRef();

  const handleFilter = async (event) => {
    setHide(true)

    const search = event.target.value;
    setSearchWord(search)
    try {
      const { data: { data } } = await authAxios.get(`operator/list/name?operatorName=${search}`)
      setFilteredData(data)
    } catch (error) {
      console.log("Error : " + error);
    }
  }

  useEffect(()=>{
    if(localStorage.getItem('token')){
      setDisable(false)
  }
  },[])

  const clearInput = () => {
    setSearchWord("")
    setFilteredData([]);
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
        disabled={disable}
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchWord}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <Search className="searchCloseMainIcon" />
          ) : (
            <Close id="clearBtn" onClick={clearInput} className="searchCloseMainIcon" />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className={hide ? 'dataResult' : 'dataResultHidden'}>
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <Button className="dataItem" key={key} onClick={() => {
                inputRef.current.value = value.residentGroupName;
                setFilteredData([])
                setSearchWord(value.residentGroupName)
                setSearchData(value)
                // setHide(false)
              }} rel="noreferrer">
                <p>{value.residentGroupName} </p>
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar