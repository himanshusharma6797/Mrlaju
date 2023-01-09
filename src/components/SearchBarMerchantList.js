import React, { useRef, useState } from "react";
import "./SearchBar.css";
import Search from "@mui/icons-material/Search";
import Close from "@mui/icons-material/Close";
import { Button } from "@material-ui/core";
import { authAxios } from "../services/auth.service";

function SearchBarMerchantList({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [hide, setHide] = useState(true)
  const inputRef = useRef();


  const handleFilter = async (event) => {
    setHide(true)
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const { data: { data } } = await authAxios.get(`merchant/list/name?merchantName=${searchWord}`)

    if (searchWord === 2) {
      setFilteredData([]);
    } else {
      setFilteredData(data);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={wordEntered}
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
                inputRef.current.value = value.businessName;
                setWordEntered(value.businessName)
                // setFilteredData([])
                setHide(false)
              }} rel="noreferrer">
                <p>{value.businessName} </p>
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBarMerchantList;