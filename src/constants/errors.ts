enum ErrorTypes {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  UnprocessableEntity = 422,
  InternalServerError = 500,
  BadGatewayError = 502,
}

interface MappedError {
  type: keyof typeof ErrorTypes;
  errorCode: ErrorTypes;
  message: string;
  details?: Record<string, unknown>;
}

const createBadRequestError = (
  message: string,
  details?: Record<string, unknown>,
) =>
  JSON.stringify({
    type: "BadRequest",
    errorCode: ErrorTypes.BadRequest,
    message,
    details,
  });

const createNotFoundError = (
  message: string,
  details?: Record<string, unknown>,
) =>
  JSON.stringify({
    type: "NotFound",
    errorCode: ErrorTypes.NotFound,
    message,
    details,
  });

const createInternalServerError = (
  message: string,
  details?: Record<string, unknown>,
) =>
  JSON.stringify({
    type: "InternalServerError",
    errorCode: ErrorTypes.InternalServerError,
    message,
    details,
  });

const createBadGatewayError = (
  message: string,
  details?: Record<string, unknown>,
) =>
  JSON.stringify({
    type: "BadGatewayError",
    errorCode: ErrorTypes.BadGatewayError,
    message,
    details,
  });

const createConflictError = (
  message: string,
  details?: Record<string, unknown>,
) =>
  JSON.stringify({
    type: "Conflict",
    errorCode: ErrorTypes.Conflict,
    message,
    details,
  });

const errorMessages = {
  userAlreadyExists: "Usuário já cadastrado!",
  getDataError: "Erro ao buscar informações na tabela de ",
  userNotFound: "Usuário não encontrado!",
  userOrPasswordInvalid: "Usuário ou senha inválidos!",
  invalidDocument: "Documento inválido!",
  sessionExpired: "Sessão expirada!",
  sessionNotFound: "Sessão não encontrada!",
  unauthorizedAccess: "Acesso não autorizado!",
};

export {
  createBadGatewayError,
  createBadRequestError,
  createConflictError,
  createInternalServerError,
  createNotFoundError,
  errorMessages,
  ErrorTypes,
  MappedError
};

