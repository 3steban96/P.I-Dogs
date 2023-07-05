import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { obtDogs } from "../../redux/actions";
import CardDog from "./CardDog";
import { Link } from "react-router-dom";
import Paginated from "../Paginated";

export default function CardsDog() {
  const stateDogs = useSelector((state) => state.dogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtDogs());
  }, [dispatch]);

  const [dataSource, setDataSource] = useState("all");
  const [selectedTemperament, setSelectedTemperament] = useState("");
  const [nameSortOrder, setNameSortOrder] = useState("asc");
  const [weightSortOrder, setWeightSortOrder] = useState("asc");
  const [sortedDogs, setSortedDogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);

  const indexLastDogs = currentPage * dogsPerPage;
  const indexFirstDogs = indexLastDogs - dogsPerPage;

  useEffect(() => {
    const sorted = [...stateDogs].sort((a, b) => {
      if (nameSortOrder === "asc") {
        // Ordenar alfabéticamente ascendente
        return a.name.localeCompare(b.name);
      } else if (nameSortOrder === "desc") {
        // Ordenar alfabéticamente descendente
        return b.name.localeCompare(a.name);
      }
    });

    const filteredByTemperament = sorted.filter((dog) => {
      if (selectedTemperament === "") {
        return true; // Mostrar todos los perros si no se ha seleccionado un temperamento
      } else {
        return dog.temper && dog.temper.includes(selectedTemperament);
      }
    });
  
    const filteredByDataSource = filteredByTemperament.filter((dog) => {
      if (dataSource === "all") {
        return true; // Mostrar todos los perros si no se ha seleccionado una fuente de datos
      } else if (dataSource === "db") {
        return dog.fromDB;
      } else if (dataSource === "api") {
        return !dog.fromDB;
      }
    });
  
    setSortedDogs(filteredByDataSource);
  }, [stateDogs, nameSortOrder, weightSortOrder, selectedTemperament, dataSource]);
  const temperaments = ["Stubborn","Curious","Playful","Adventurous","Active","Fun-loving","Aloof","Clownish","Dignified","Independent",
  "Happy","Wild","Dutiful","Friendly","Outgoing","Confident","Alert","Intelligent","Courageous","Brave",
  "Docile","Loyal","Responsive","Composed","Receptive","Faithful","Loving","Trainable","Responsible","Protective",
  "Energetic","Gentle","Affectionate","Devoted","Assertive","Dominant","Strong Willed","Obedient","Reserved","Kind",
  "Sweet-Tempered","Tenacious","Steady","Attentive","Bold","Proud","Reliable","Fearless","Self-assured",
  "Cautious","Eager","Good-natured","Spirited","Companionable","Even Tempered","Rugged","Fierce","Refined","Joyful",
  "Agile","Excitable","Amiable","Determined","Self-confidence","Calm","Good-tempered","Hardy","Watchful","Hard-working",
  "Feisty","Cheerful","Sensitive","Easygoing","Adaptable","Trusting","Lovable","Territorial","Keen","Familial",
  "Rational","Quick","Bright","Powerful","Gay","Stable","Quiet","Inquisitive","Strong","Sociable",
  "Patient","Suspicious","Merry","Great-hearted","Vocal","Tolerant","Mischievous","People-Oriented","Bossy","Cunning",
  "Athletic","Boisterous","Cooperative","Trustworthy","Self-important","Respectful","Thoughtful","Generous","Cat-like","Sturdy",
  "Benevolent","Clever","Bubbly","Opinionated","Aggressive","Extroverted","Charming","Unflappable","Spunky","Diligent",
  "Willful","Fast","Vigilant"
]
  useEffect(() => {
    const sorted = [...stateDogs].sort((a, b) => {
      if (weightSortOrder === "asc" && typeof a.weight === 'string' && typeof b.weight === 'string') {
        // Ordenar por peso ascendente
        const weightA = parseInt(a.weight.split(" - ")[0]);
        const weightB = parseInt(b.weight.split(" - ")[0]);
        return weightA - weightB;
      } else if (weightSortOrder === "desc" && typeof a.weight === 'string' && typeof b.weight === 'string') {
        // Ordenar por peso descendente
        const weightA = parseInt(a.weight.split(" - ")[0]);
        const weightB = parseInt(b.weight.split(" - ")[0]);
        return weightB - weightA;
      }
      return 0;
    });
    setSortedDogs(sorted);
  }, [stateDogs, weightSortOrder]);
  

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const currentDogs = sortedDogs.slice(indexFirstDogs, indexLastDogs);

  return (
    <div className="containerPrueba">
      <div className="leftPrueba">
      <div>
        <h4>Ordenar alfabéticamente:</h4>
        <select
        className="select"
          value={nameSortOrder}
          onChange={(e) => setNameSortOrder(e.target.value)}
        >
          <option className="option" value="asc">Ascendente</option>
          <option className="option" value="desc">Descendente</option>
        </select>
      </div>
      <div>
        <h4>Ordenar por peso:</h4>
        <select
          className="select"
          value={weightSortOrder}
          onChange={(e) => setWeightSortOrder(e.target.value)}
        >
          <option className="option" value="asc">Ascendente</option>
          <option className="option" value="desc">Descendente</option>
        </select>
      </div>
      <div>
        <h4>Filtrar por temperamento:</h4>
        <select
          className="select"
          value={selectedTemperament}
          onChange={(e) => setSelectedTemperament(e.target.value)}
        >
          <option className="option" value="">Todos los temperamentos</option>
          {temperaments.map((temperament, index) => (
            <option key={index} value={temperament}>
              {temperament}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h4>Filtrar por fuente de datos:</h4>
        <select
          className="select"
          value={dataSource}
          onChange={(e) => setDataSource(e.target.value)}
        >
          <option value="all">Todas las fuentes</option>
          <option value="db">Base de datos</option>
          <option value="api">API</option>
        </select>
      </div>
      </div>
      <div className="centerPrueba">
      <div className="card-container2">
        {currentDogs.length > 0 ? (
          currentDogs.map((rc) => (
            <Link key={rc.id} to={`/details/${rc.id}`}>
              <CardDog
                name={rc.name}
                image={rc.image}
                temper={rc.temper}
                weight={rc.weight}
              />
            </Link>
          ))
        ) : (
          <h3>No hay información</h3>
        )}
      </div>
      <div className="PaginatedP">
        <Paginated
          paginated={paginated}
          stateDogs={sortedDogs.length}
          dogsPerPage={dogsPerPage}
        />
      </div>
      </div>      

    </div>
  );
}


