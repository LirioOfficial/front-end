import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../componentes/Layout";
import { api } from "../../servicos/api";
import { useAuth } from "../../contexto/AuthContext";

const tipos = ["Avistamento", "Encalhe", "Ninho", "Eclosão"];
const especies = [
  "Não identificada",
  "Tartaruga-verde",
  "Tartaruga-cabeçuda",
  "Tartaruga-de-pente",
  "Tartaruga-de-couro",
  "Tartaruga-oliva",
];

export default function RegistrarOcorrencia() {
  const { token } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    tipo: tipos[0],
    especie: especies[0],
    local: "",
    data: "",
    hora: "",
    situacao: "Pendente",
    observacoes: "",
  });
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);
  const mudar = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));

  async function salvar(event) {
    event.preventDefault();
    setErro("");
    setSalvando(true);
    try {
      const file = event.currentTarget.elements.imagem?.files?.[0];
      const imagens = [];
      if (file) {
        if (file.size > 1_000_000)
          throw new Error("A imagem deve ter até 1 MB para envio.");
        imagens.push(
          await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () =>
              reject(new Error("Não foi possível ler a imagem."));
            reader.readAsDataURL(file);
          }),
        );
      }
      const dataOcorrencia = form.data
        ? new Date(`${form.data}T${form.hora || "12:00"}`).toISOString()
        : new Date().toISOString();
      await api("/ocorrencias", {
        token,
        method: "POST",
        body: JSON.stringify({
          tipo: form.tipo,
          especie: form.especie,
          local: { nome: form.local.trim() },
          dataOcorrencia,
          situacao: form.situacao,
          observacoes: form.observacoes,
          imagens,
        }),
      });
      router.push("/ocorrencias");
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Layout titulo="Registrar ocorrência" ativo="/ocorrencias">
      <form className="form-registro" onSubmit={salvar}>
        {erro && (
          <p className="erro" role="alert">
            {erro}
          </p>
        )}
        <label htmlFor="tipo-ocorrencia">Tipo de ocorrência</label>
        <select
          id="tipo-ocorrencia"
          value={form.tipo}
          onChange={(event) => mudar("tipo", event.target.value)}
        >
          {tipos.map((tipo) => (
            <option key={tipo}>{tipo}</option>
          ))}
        </select>
        <label htmlFor="especie-ocorrencia">Espécie</label>
        <select
          id="especie-ocorrencia"
          value={form.especie}
          onChange={(event) => mudar("especie", event.target.value)}
        >
          {especies.map((especie) => (
            <option key={especie}>{especie}</option>
          ))}
        </select>
        <label htmlFor="local-ocorrencia">Local da ocorrência</label>
        <input
          id="local-ocorrencia"
          value={form.local}
          onChange={(event) => mudar("local", event.target.value)}
          required
        />
        <label>Data e horário da ocorrência</label>
        <div className="dupla">
          <input
            type="date"
            value={form.data}
            onChange={(event) => mudar("data", event.target.value)}
          />
          <input
            type="time"
            value={form.hora}
            onChange={(event) => mudar("hora", event.target.value)}
          />
        </div>
        <label htmlFor="status-ocorrencia">Situação</label>
        <select
          id="status-ocorrencia"
          value={form.situacao}
          onChange={(event) => mudar("situacao", event.target.value)}
        >
          <option>Pendente</option>
          <option>Em análise</option>
          <option>Concluída</option>
        </select>
        <label htmlFor="observacoes-ocorrencia">Observações</label>
        <textarea
          id="observacoes-ocorrencia"
          value={form.observacoes}
          onChange={(event) => mudar("observacoes", event.target.value)}
        />
        <label className="upload-label">
          Adicionar imagem
          <input type="file" name="imagem" accept="image/*" />
        </label>
        <button className="btn verde central" type="submit" disabled={salvando}>
          {salvando ? "Salvando..." : "Salvar ocorrência"}
        </button>
      </form>
    </Layout>
  );
}
