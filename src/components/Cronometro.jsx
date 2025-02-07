import { useState, useEffect } from "react";
import "./Cronometro.css";
const Cronometro = () => {
  const [segundos, setSegundos] = useState(() => {
    return parseInt(localStorage.getItem("tempoEstudo")) || 0;
  });

  const [emExecucao, setEmExecucao] = useState(() => {
    return localStorage.getItem("emExecucao") === "true";
  });

  useEffect(() => {
    localStorage.setItem("tempoEstudo", segundos);
  }, [segundos]);

  useEffect(() => {
    localStorage.setItem("emExecucao", emExecucao);
  }, [emExecucao]);

  useEffect(() => {
    let intervalo;
    if (emExecucao) {
      intervalo = setInterval(() => {
        setSegundos((prevSegundos) => prevSegundos + 1);
      }, 1000);
    } else {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [emExecucao]);

  const iniciarPausar = () => {
    setEmExecucao((prev) => !prev);
  };
  const resetar = () => {
    setSegundos(0);
    setEmExecucao(false);
    localStorage.removeItem("tempoEstudo");
    localStorage.removeItem("emExecucao");
  };
  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = segundos % 60;
  return (
    <div>
      <h1 className="cronometro">
        {minutos < 10 ? `0${minutos}` : minutos}:
        {segundosRestantes < 10 ? `0${segundosRestantes}` : segundosRestantes}
      </h1>
      <button className="btn-cronometro" onClick={iniciarPausar}>
        {emExecucao ? "Pausar" : "Iniciar"}
      </button>
      <button className="btn-cronometro" onClick={resetar}>
        Resetar
      </button>
    </div>
  );
};

export default Cronometro;
