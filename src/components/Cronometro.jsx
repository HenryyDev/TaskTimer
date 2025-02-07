import { useState, useEffect } from "react";
import "./Cronometro.css";
const Cronometro = () => {
  const [segundos, setSegundos] = useState(() => {
    return parseInt(localStorage.getItem("tempoEstudo")) || 0;
  });

  const [emExecucao, setEmExecucao] = useState(() => {
    return localStorage.getItem("emExecucao") === "true";
  });
  const [inicio, setInicio] = useState(() => {
    return parseInt(localStorage.getItem) || null;
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
      const agora = Date.now();
      if (!inicio) {
        setInicio(agora);
        localStorage.getItem("inicio", agora);
      }

      intervalo = setInterval(() => {
        const tempoDecorrido = Math.floor((Date.now() - inicio) / 1000);
        setSegundos(tempoDecorrido);
      }, 1000);
    } else {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [emExecucao, inicio]);

  const iniciarPausar = () => {
    if (!emExecucao) {
      setInicio(Date.now() - segundos * 1000);
      localStorage.setItem("inicio", Date.now() - segundos * 1000);
    }
    setEmExecucao((prev) => !prev);
  };
  const resetar = () => {
    setSegundos(0);
    setEmExecucao(false);
    setInicio(null);
    localStorage.removeItem("tempoEstudo");
    localStorage.removeItem("emExecucao");
    ocalStorage.removeItem("inicio");
  };
  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = segundos % 60;
  return (
    <div>
      <h1 className="cronometro">
        {String(minutos).padStart(2, "0")}:
        {String(segundosRestantes).padStart(2, "0")}
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
