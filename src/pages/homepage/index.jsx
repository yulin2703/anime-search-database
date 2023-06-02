import { useState } from "react";
import AnimeItem from "../../components/anime-item";
import Search from "../../components/search";
import "./styles.css";


const Homepage = () => {
  const [loadingstate, setloadingstate] = useState(false);

  const [animes, setanimes] = useState([]);

  const getdatafromsearchcomponent = (searchdata) => {
    setloadingstate(true);

    async function getanimes() {
      const apiresponse = await fetch(
        `https://api.jikan.moe/v4/anime?q=${searchdata}&limit=10`
      );
      const result = await apiresponse.json();
      const { data } = result;

      if (data && data.length > 0) {
        setloadingstate(false);
        setanimes(data);
      }
      console.log(result);
    }
    getanimes();
  };

  console.log(loadingstate, animes, "loadingstate recipes");


  return (
    <div className="homepage">
       <header>
            <a href="https://github.com/yulin2703" target= "_blank" >YU LIN'S ANIME SEARCHER </a>
        </header>

        <div className="webname">SEARCH ANIME HERE! </div>

      <Search getdatafromsearchcomponent={getdatafromsearchcomponent} />

      {loadingstate && (
        <div className="loadingmsg">LOADING...</div>
      )}

      <div className="itembox">{
       animes && animes.length>0?
       animes.map((item)=>
       <AnimeItem
       id={item.mal_id}
       image={item.images.jpg.image_url}
       title ={item.title}
       airingstatus={item.status}
       rank={item.rank}
       rating={item.rating}
       url={item.url}
       />)
       :null
       }
       </div>

           </div>
  );
};

export default Homepage;
