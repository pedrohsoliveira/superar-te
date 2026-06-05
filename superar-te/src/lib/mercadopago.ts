export type TipoInscricao = "COM_CAMISA" | "SEM_CAMISA";

export const pagamentoOptions = [
  {
    tipo: "COM_CAMISA" as TipoInscricao,
    titulo: "Com camisa",
    preco: 159.9,
    descricao:
      "Participação + camisa oficial + medalha + certificado + dashboard + comunidade",
  },
  {
    tipo: "SEM_CAMISA" as TipoInscricao,
    titulo: "Sem camisa",
    preco: 85.9,
    descricao:
      "Participação + medalha + certificado + dashboard + comunidade",
  },
];

export function getValorInscricao(tipo: TipoInscricao) {
  const option = pagamentoOptions.find((item) => item.tipo === tipo);
  if (!option) {
    throw new Error(`Tipo de inscrição inválido: ${tipo}`);
  }
  return option.preco;
}

export function getTituloPagamento(tipo: TipoInscricao) {
  if (tipo === "COM_CAMISA") {
    return "Inscrição SUPERAR-TE 100KM - Com camisa";
  }

  return "Inscrição SUPERAR-TE 100KM - Sem camisa";
}
