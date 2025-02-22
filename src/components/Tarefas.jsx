import { useEffect, useState } from "react";
import "./Tarefas.css";
const Tarefas = () => {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [idCounter, setIdCounter] = useState(0);

  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");

    const tarefasParse = tarefasSalvas ? JSON.parse(tarefasSalvas) : [];

    setTarefas(tarefasParse);

    const maxId =
      tarefasParse.length > 0
        ? tarefasParse.reduce((max, tarefa) => Math.max(max, tarefa.id), 0)
        : 0;

    setIdCounter(maxId + 1);
  }, []);

  useEffect(() => {
    if (tarefas.length > 0) {
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
  }, [tarefas]);
  const adicionarTarefa = (e) => {
    e.preventDefault();
    if (novaTarefa.trim() !== "") {
      const novaTarefaObj = {
        id: idCounter,
        nome: novaTarefa,
        feito: false,
      };
      setTarefas([...tarefas, novaTarefaObj]);
      setIdCounter(idCounter + 1);
      setNovaTarefa("");
    }
  };
  const alternarFeito = (id) => {
    setTarefas((prevTarefas) =>
      prevTarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, feito: !tarefa.feito } : tarefa
      )
    );
  };
  const removerTarefa = (id) => {
    const novasTarefas = tarefas.filter((tarefa) => tarefa.id !== id);

    setTarefas(novasTarefas);
    localStorage.setItem("tarefas", JSON.stringify(novasTarefas));
  };
  return (
    <div className="task-container">
      <h2>Tasks</h2>
      <div className="add-task">
        <form onSubmit={adicionarTarefa}>
          <input
            required
            type="text"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            placeholder="Adicionar nova tarefa"
          />
          <button className="btn-submit" type="submit">
            Adicionar Tarefa
          </button>
        </form>
      </div>

      <ul className={tarefas.length > 0 ? "list-tasks" : ""}>
        {tarefas &&
          tarefas.map((tarefa) => (
            <li key={tarefa.id}>
              <div
                className={
                  tarefa.feito === true ? "wrap task-finished" : "wrap"
                }
              >
                <div>
                  <button
                    className="state-task"
                    onClick={() => alternarFeito(tarefa.id)}
                  >
                    <img
                      src={tarefa.feito === false ? "/check.svg" : "/close.svg"}
                      alt=""
                    />
                  </button>
                  <b className={tarefa.feito === false ? "" : "finished"}>
                    {tarefa.nome}
                  </b>
                </div>
                <button
                  className="remove"
                  onClick={() => removerTarefa(tarefa.id)}
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Tarefas;
