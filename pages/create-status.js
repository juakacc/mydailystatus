import React, { useState } from "react";
import auth0 from "../lib/auth0";
import axios from "axios";

const CreateStatus = () => {
  const [dados, setDados] = useState({
    status: "bem",
    coords: {
      lat: null,
      long: null,
    },
  });

  const getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords);
        setDados(old => {
          return {
            ...old,
            coords: {
              lat: position.coords.latitude,
              long: position.coords.longitude,
            },
          };
        });
      });
    }
  };

  const save = async () => {
    await axios.post("/api/save-status", dados);
  };

  const onChangeStatus = evt => {
    const status = evt.target.value;

    setDados(old => {
      return {
        ...old,
        status,
      };
    });
  };

  return (
    <div>
      <label className="block">
        <input
          type="radio"
          name="status"
          value="bem"
          onClick={onChangeStatus}
        />{" "}
        Estou bem e sem sintomas.
      </label>
      <label className="block">
        <input
          type="radio"
          name="status"
          value="gripe"
          onClick={onChangeStatus}
        />{" "}
        Estou com sintomas de gripe / resfriado.
      </label>
      <label className="block">
        <input
          type="radio"
          name="status"
          value="covid"
          onClick={onChangeStatus}
        />{" "}
        Estou com sintomas de covid.
      </label>
      <p>Sua posição atual: {JSON.stringify(dados)}</p>

      <button onClick={getMyLocation}>Pegar minha localização</button>
      <button onClick={save}>Salvar status</button>
    </div>
  );
};

export default CreateStatus;

export const getServerSideProps = async ({ req, res }) => {
  const session = await auth0.getSession(req);

  if (session) {
    return {
      props: {
        isAuth: true,
        user: session.user,
      },
    };
  } else {
    return {
      props: {
        isAuth: false,
        user: {},
      },
    };
  }
};
