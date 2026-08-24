const isValidCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += Number(cpf[i]) * (10 - i);
  }

  let digit = (sum * 10) % 11;
  if (digit === 10) digit = 0;

  if (digit !== Number(cpf[9])) return false;

  sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += Number(cpf[i]) * (11 - i);
  }

  digit = (sum * 10) % 11;
  if (digit === 10) digit = 0;

  return digit === Number(cpf[10]);
};

const isValidCNPJ = (cnpj: string): boolean => {
  cnpj = cnpj.replace(/\D/g, "");

  if (cnpj.length !== 14) return false;

  // Rejeita sequências iguais (000..., 111..., etc.)
  if (/^(\d)\1+$/.test(cnpj)) return false;

  const calculateDigit = (length: number): number => {
    let sum = 0;
    let pos = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += Number(cnpj[length - i]) * pos--;

      if (pos < 2) {
        pos = 9;
      }
    }

    const result = sum % 11;

    return result < 2 ? 0 : 11 - result;
  };

  const digit1 = calculateDigit(12);

  if (digit1 !== Number(cnpj[12])) {
    return false;
  }

  const digit2 = calculateDigit(13);

  return digit2 === Number(cnpj[13]);
};

const isValidDocument = (document: string) => {
  return isValidCNPJ(document) || isValidCPF(document);
};

export { isValidCNPJ, isValidCPF, isValidDocument };
