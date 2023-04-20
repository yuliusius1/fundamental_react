import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { getActiveNotes } from "../utils/local-data";
import { getActiveNotes } from "../utils/api";
import NoteList from "../components/NoteList";
import SearchBar from "../components/SearchBar";
import { FiPlus } from "react-icons/fi";
import FloatingButton from "../components/FloatingButton";
// import PropTypes from "prop-types";
import LocaleContext from "../context/LocaleContext";
import useDetailNotes from "../hooks/useDetailNotes";

// function HomePageWrapper() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const handleClick = () => navigate("/add");
//   const keyword = searchParams.get("keyword");

//   function changeSearchParams(keyword) {
//     setSearchParams({ keyword });
//   }

//   return (
//     <HomePage
//       defaultKeyword={keyword}
//       keywordChange={changeSearchParams}
//       handleClick={handleClick}
//     />
//   );
// }

// class HomePage extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       notes: getActiveNotes(),
//       keyword: props.defaultKeyword || "",
//       handleClick: props.handleClick,
//     };

//     this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
//   }

//   onKeywordChangeHandler(keyword) {
//     this.setState(() => {
//       return {
//         keyword,
//       };
//     });

//     this.props.keywordChange(keyword);
//   }

//   render() {
//     const notes = this.state.notes.filter((note) => {
//       return note.title
//         .toLowerCase()
//         .includes(this.state.keyword.toLowerCase());
//     });
//     return (
//       <section>
//         <h2>Catatan Aktif</h2>
//         <SearchBar
//           keyword={this.state.keyword}
//           keywordChange={this.onKeywordChangeHandler}
//         />
//         <NoteList notes={notes} />
//         <div className="homepage__action">
//           <FloatingButton
//             children={<FiPlus />}
//             onClick={this.state.handleClick}
//           />
//         </div>
//       </section>
//     );
//   }
// }

// HomePage.propTypes = {
//   defaultKeyword: PropTypes.string,
//   handleClick: PropTypes.func.isRequired,
//   keywordChange: PropTypes.func.isRequired,
// };

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [notes, initializing] = useListNotes(false);
  const [notes, setNotes, initializing] = useDetailNotes({
    archived: false,
    id: null,
  });
  const navigate = useNavigate();
  const handleClick = () => navigate("/add");
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });
  const { locale } = React.useContext(LocaleContext);

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });
  if (!initializing) {
    return (
      <section>
        <h2>{locale === "id" ? "Catatan Aktif" : "Active notes"}</h2>
        <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
        <NoteList notes={filteredNotes} />
        <div className="homepage__action">
          <FloatingButton children={<FiPlus />} onClick={handleClick} />
        </div>
      </section>
    );
  } else {
    return (
      <section>
        <h2>{locale === "id" ? "Catatan Aktif" : "Active notes"}</h2>
        <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
        {locale === "id" ? "Memuat Catatan..." : "Fetching Notes.."}
        <div className="homepage__action">
          <FloatingButton children={<FiPlus />} onClick={handleClick} />
        </div>
      </section>
    );
  }
}
export default HomePage;
