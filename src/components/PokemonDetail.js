import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function PokemonDetail() {
  const params = useParams();



  let [pokemon, setPokemon] = useState({});
  let [loading, setLoading] = useState(true);
  let [abilities, setAbilites] = useState(true);
  let [dataAbilites, setDataAbilites] = useState({});
  let [notFound, setNotFound] = useState(false);




  async function handle(id) {

        let data = []
        data.push(id)
        localStorage.setItem("id", data)
  }


  useEffect(() => {
    



    async function getPokemon() {
      let request = await fetch(
        `https://api.pokemontcg.io/v2/cards/${params.id}?api_key=8393687e-b96a-4f84-ac53-c5f5aad37d06`
      );
      if (!request.ok) {
        setLoading(false);
        setNotFound(true);
      }
      let response = await request.json();
      setLoading(false);
      setPokemon(response.data);

      if (response.data.abilities) {
        setAbilites(false);
        setDataAbilites(response.data.abilities);
      } else {
        setAbilites(true);
      }
    }
    getPokemon();
  }, [params]);


 


 


  if (notFound) {
    return <h1 className="text-center mt-5">Halaman Tidak ada</h1>;
  }

  if (abilities) {
    return (
    <section className="detail">
      <div className="container">
        <div className="row">
          {loading && (
            <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {!loading && (
            <>
              <section className="mt-5">
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={pokemon.images.large}
                        className="img-fluid rounded-start"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title"> {pokemon.name} </h5>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            <b>SuperType : </b> {pokemon.supertype}
                          </li>
                          <li className="list-group-item">
                            <b>Type : </b> {pokemon.types}
                          </li>
                          <li className="list-group-item">
                            Tidak ada Abilites
                          </li>
                          <Link
                            to={"/"}
                            className="ms-2 text-decoration-none mt-4"
                          >
                            Back to home
                          </Link>

                          
                        </ul>
                        <button className="btn btn-primary mt-4" onClick={handle.bind(this, pokemon.id)}>Primary</button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </section>);
  }

  if (!abilities) {
    return (
      <section className="detail">
        <div className="container">
          <div className="row">
            {loading && (
              <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {!loading && (
              <>
                <section className="mt-5">
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src={pokemon.images.large}
                          className="img-fluid rounded-start"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title"> {pokemon.name} </h5>
                          <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                              <b>SuperType : </b> {pokemon.supertype}
                            </li>
                            <li className="list-group-item">
                              <b>Type : </b> {pokemon.types}
                            </li>
                            <li className="list-group-item">
                              <b>Abilites : </b>
                              {dataAbilites.map((item) => {
                                return (
                                  <ul>
                                    <li>
                                      {item.name}
                                      <p> {item.text} </p>
                                      <p>
                                        <b> Type : {item.type} </b>
                                      </p>
                                    </li>
                                  </ul>
                                );
                              })}
                            </li>
                            <Link
                              to={"/"}
                              className="ms-2 text-decoration-none mt-4"
                            >
                              Back to home
                            </Link>

                          </ul>
                          <button className="btn btn-primary mt-4" onClick={handle.bind(this, pokemon.id)}>Primary</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </section>
    );
  }
}
