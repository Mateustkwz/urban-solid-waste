// schemas/auth.schema.ts

import { z } from "zod";

import { isValidCNPJ, isValidCPF } from "@backend-utils/userValidation.util";

export const RegisterSchema = (isCitizen: boolean) => {
  const validation = isCitizen
    ? z
        .string()
        .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, "CPF inválido")
        .refine(isValidCPF, {
          message: "CPF inválido",
        })
    : z
        .string()
        .regex(/^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/, "CNPJ inválido")
        .refine(isValidCNPJ, {
          message: "CNPJ inválido",
        });

  return z.object({
    name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z.email("E-mail inválido"),
    cpfOrCnpj: validation,
    address: z.string().nullable(),
    role: z.array(
      z.enum(["ASSOCIATION", "CITY_HALL", "CITIZEN"], "Role inválida"),
    ),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    points: z
      .number()
      .int()
      .nonnegative("Pontos não podem ser negativos")
      .nullable(),
  });
};
