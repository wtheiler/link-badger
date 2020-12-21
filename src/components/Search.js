import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Search from '@material-ui/icons/Search';

import {
    getAllLinks
} from "../api";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function SearchCards({ cards, setLinks }) {
    const classes = useStyles();
    const [searchString, setSearchString] = useState("");



    // console.log("searchString", searchString)



    const handleSearch = (event) => {
        const searchText = event.target.value
        setSearchString(searchText)
    }


    const

    return (
        <div>

            <TextField
                className={classes.margin}
                id="input-with-icon-textfield"
                label="Search"
                onChange={handleSearch}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Search />
                        </InputAdornment>
                    ),
                }}
            />

        </div>
    );
}









// import React, { useEffect, useState } from "react";

// /**
//  * Don't touch these imports!
//  */
// import {
//   fetchAllCenturies,
//   fetchAllClassifications,
//   fetchQueryResults,
// } from "../api";

// const Search = ({ setIsLoading, setSearchResults }) => {
//   const [centuryList, setCenturyList] = useState([]);
//   const [classificationList, setClassificationList] = useState([]);
//   const [queryString, setQueryString] = useState("");
//   const [century, setCentury] = useState("any");
//   const [classification, setClassification] = useState("any");

//   const handleQuery = (event) => {
//     const val = event.target.value;
//     setQueryString(val);
//   };

//   const handleClassification = (event) => {
//     const val = event.target.value;
//     setClassification(val);
//   };

//   const handleCentury = (event) => {
//     const val = event.target.value;
//     setCentury(val);
//   };

//   useEffect(() => {
//     Promise.all([fetchAllCenturies(), fetchAllClassifications()])
//       .then((values) => {
//         setCenturyList(values[0]);

//         setClassificationList(values[1]);
//       })
//       .catch((error) => {
//         console.error(error.message);
//       });
//   }, []);

//   return (
//     <form
//       id="search"
//       onSubmit={async (event) => {
//         event.preventDefault();
//         setIsLoading(true);
//         try {
//           const values = await fetchQueryResults({
//             century,
//             classification,
//             queryString,
//           });
//           console.log("from search results, initially", values);
//           setSearchResults(values);
//         } catch (err) {
//           console.error(err);
//         } finally {
//           setIsLoading(false);
//         }
//       }}
//     >
//       <fieldset>
//         <label htmlFor="keywords">Query</label>
//         <input
//           id="keywords"
//           type="text"
//           placeholder="enter keywords..."
//           value={queryString}
//           onChange={handleQuery}
//         />
//       </fieldset>
//       <fieldset>
//         <label htmlFor="select-classification">
//           Classification{" "}
//           <span className="classification-count">
//             ({classificationList.length})
//           </span>
//         </label>
//         <select
//           name="classification"
//           id="select-classification"
//           value={classification}
//           onChange={handleClassification}
//         >
//           <option value="any">Any</option>
//           {classificationList.map((item) => {
//             return <option key={item.name}>{item.name}</option>;
//           })}
//         </select>
//       </fieldset>
//       <fieldset>
//         <label htmlFor="select-century">
//           Century <span className="century-count">({centuryList.length})</span>
//         </label>
//         <select
//           name="century"
//           id="select-century"
//           value={century}
//           onChange={handleCentury}
//         >
//           <option value="any">Any</option>
//           {centuryList.map((cent) => {
//             return <option key={cent.name}>{cent.name}</option>;
//           })}
//         </select>
//       </fieldset>
//       <button>SEARCH</button>
//     </form>
//   );
// };

// export default Search;
