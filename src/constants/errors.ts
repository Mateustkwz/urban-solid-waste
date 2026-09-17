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
  userNotRegistered: "Usuário não cadastrado!",
  duplicateAddressName: "Nome do endenreço já existe!",
  addressAlreadyExists: "Endereço já existe",
  invalidDocument: "Documento inválido!",
  addressNotFound: "Endereço não encontrado!",
  sessionExpired: "Sessão expirada!",
  sessionNotFound: "Sessão não encontrada!",
  unauthorizedAccess: "Acesso não autorizado!",
  internalServerError: "Erro interno no servidor!",
  deliveryNotFound: "Entrega não encontrada!",
  associationNotFound: "Associação não encontrada!",
  rewardAlreadyExists: "Recompensa já existe!",
  rewardNotFound: "Recompensa não encontrada!",
  invalidDeliveryStatus: "Status de entrega inválido!",
  invalidDeliveryMethod: "Método de entrega inválido!",
  invalidDeliveryUnit: "Unidade de entrega inválida!",
  invalidDeliveryDate: "Data de entrega inválida!",
  invalidDeliveryQuantity: "Quantidade de entrega inválida!",
  invalidDeliveryMaterial: "Material de entrega inválido!",
  invalidAddressType: "Tipo de endereço inválido!",
  invalidAddressStreet: "Rua do endereço inválida!",
  invalidAddressNumber: "Número do endereço inválido!",
  invalidAddressZipCode: "CEP do endereço inválido!",
  invalidAddressComplement: "Complemento do endereço inválido!",
  invalidAddressCity: "Cidade do endereço inválida!",
  invalidAddressState: "Estado do endereço inválido!",
  permissionDenied: "Usuário não tem permissão para realizar esta ação!",
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

