import { useState, useEffect } from "react";
import "./Cronometro.css";

const formatarTempo = (tempo) => String(tempo).padStart(2, "0"); //FUNÇÃO PARA FORMATAR O TEMPO

const Cronometro = () => {
  const [segundos, setSegundos] = useState(() => {
    return parseInt(localStorage.getItem("tempoEstudo")) || 0;
  });

  const [emExecucao, setEmExecucao] = useState(() => {
    return localStorage.getItem("emExecucao") === "true";
  });
  const [inicio, setInicio] = useState(() => {
    return parseInt(localStorage.getItem("inicio")) || null;
  });
  //ALTERA O TITULO DA PÁGINA EM TEMPO REAL
  useEffect(() => {
    document.title = `${formatarTempo(minutos)}:${formatarTempo(
      segundosRestantes
    )} | TaskTimer`;
  }, [segundos]);
  useEffect(() => {
    localStorage.setItem("tempoEstudo", segundos);
    localStorage.setItem("emExecucao", emExecucao);
  }, [segundos, emExecucao]);

  useEffect(() => {
    let intervalo;
    if (emExecucao && inicio !== null) {
      intervalo = setInterval(() => {
        const tempoDecorrido = Math.floor((Date.now() - inicio) / 1000);
        setSegundos(tempoDecorrido);
      }, 1000);
    } else {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [emExecucao, inicio]);

  useEffect(() => {
    //PAUSA O TEMPO E SALVA QUANDO FECHA A ABA
    const salvarAoFecharAba = () => {
      localStorage.setItem("tempoEstudo", segundos);
      setEmExecucao(false);
      localStorage.setItem("emExecucao", emExecucao);
    };
    window.addEventListener("beforeunload", salvarAoFecharAba);
    return () => {
      window.removeEventListener("beforeunload", salvarAoFecharAba);
    };
  }, [segundos, emExecucao]);
  const iniciarPausar = () => {
    if (!emExecucao) {
      const novoInicio = Date.now() - segundos * 1000;
      setInicio(novoInicio);
      localStorage.setItem("inicio", novoInicio);
    }
    setEmExecucao((prev) => !prev);
  };
  const resetar = () => {
    setSegundos(0);
    setEmExecucao(false);
    setInicio(null);
    localStorage.removeItem("tempoEstudo");
    localStorage.removeItem("emExecucao");
    localStorage.removeItem("inicio");
  };
  const minutos = Math.floor(segundos / 60);
  const segundosRestantes = segundos % 60;
  return (
    <div>
      <h1 className="cronometro">
        {formatarTempo(minutos)}:{formatarTempo(segundosRestantes)}
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
