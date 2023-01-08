import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Core() {
  let [pokemon, setPokemon] = useState([]);
  let [loading, setLoading] = useState(true);
  let [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getPokemon() {
      let request = await fetch(
        "https://api.pokemontcg.io/v2/cards?api_key=8393687e-b96a-4f84-ac53-c5f5aad37d06&pageSize=40"
      );
      let response = await request.json();
      setLoading(false);
      setPokemon(response.data);
    }

    getPokemon();
  }, []);

  return (
    <section className="inti mt-5">
      <div className="container">
        <div className="row">
          <div className="mb-5">
            <input
              className="form-control"
              type="text"
              placeholder="Cari pokemon..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading && (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {!loading && (
            <>
              {pokemon
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val.name
                      .toLowerCase()
                      .includes(searchTerm.toLocaleLowerCase())
                  ) {
                    return val;
                  } else {
                    return false;
                  }
                })

                .map((item) => {
                  return (
                    <div className="col-md-4" key={item.id}>
                      <div className="card mb-5">
                        <img src={item.images.large} alt="gambar-pokemon" />
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item"> <b>SuperType : </b> {item.supertype} </li>
                            <li className="list-group-item"> <b>Type : </b> {item.types} </li>
                          </ul>
                          <Link to={`/pokemonDetail/${item.id}`} className="detail">
                            <span className="badge text-bg-primary mt-2">Detail</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
