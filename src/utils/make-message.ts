const makeMessage = (
  customMessage: string,
  serviceName: string,
  value: number
) => `
${customMessage ?? `Eai caloteiro, lembra do ${serviceName}? To aqui pra cobrar, COMEDIA!`}

----
VALOR: R$: ${value}
ATE HOJE MEMO, SE NAO DEPOSITAR OS CARA VAO BATER AI NA SUA PORTA
----

Grato, ate a proxima vacilao!
`;
