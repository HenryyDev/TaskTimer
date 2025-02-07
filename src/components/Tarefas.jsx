import { useEffect, useState } from "react";
import "./Tarefas.css";
const Tarefas = () => {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [idCounter, setIdCounter] = useState(0);

  useEffect(() => {
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefas"));
    tarefasSalvas && setTarefas(tarefasSalvas);
    const maxId =
      tarefasSalvas &&
      tarefasSalvas.reduce((max, tarefa) => Math.max(max, tarefa.id), 0);
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
    setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
  };
  return (
    <div>
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

      <ul className="list-tasks">
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            <div className="wrap">
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
                <b className={tarefa.feito === false ? "finished" : ""}>
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
