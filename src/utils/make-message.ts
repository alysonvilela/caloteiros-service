interface MakeMessageParams {
  customMessage: string | null,
  serviceName: string,
  pixKey: string,
  value: number
}
export const makeMessage = (params: MakeMessageParams) => `
${params.customMessage ?? `Eai caloteiro, lembra do ${params.serviceName}? To aqui pra cobrar, COMEDIA!`}

----
VALOR: R$: ${params.value}
PIX: ${params.pixKey}
ATE HOJE MEMO, SE NAO DEPOSITAR OS CARA VAO BATER AI NA SUA PORTA
----

Grato, ate a proxima vacilao!
`;
