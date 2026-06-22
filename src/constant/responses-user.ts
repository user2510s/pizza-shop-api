/**
 * Centraliza e padroniza as respostas da API.
 *
 * Este arquivo tem como objetivo manter um padrão semântico para os retornos,
 * evitando repetição de código e garantindo consistência entre status HTTP e
 * mensagens enviadas ao cliente.
 *
 * Cada resposta é composta por:
 * - `status`: código HTTP correspondente à operação.
 * - `response.success`: indica se a operação foi concluída com sucesso.
 * - `response.message`: mensagem padronizada para o cliente.
 *
 * Exemplo de uso:
 *
 * ```ts
 * return reply
 *   .status(response.user.notFound.status)
 *   .send(response.user.notFound.response);
 * ```
 *
 * Caso seja necessário adicionar novos módulos (auth, posts, products, etc.),
 * recomenda-se seguir a mesma estrutura para manter a padronização da aplicação.
 */

export const response = {
  user: {
    created: {
      status: 201,
      response: {
        success: true,
        message: "Usuário criado com sucesso",
      },
    },

    found: {
      status: 200,
      response: {
        success: true,
        message: "Usuário encontrado",
      },
    },

    updated: {
      status: 200,
      response: {
        success: true,
        message: "Usuário atualizado com sucesso",
      },
    },

    deleted: {
      status: 200,
      response: {
        success: true,
        message: "Usuário removido com sucesso",
      },
    },

    alreadyExists: {
      status: 409,
      response: {
        success: false,
        message: "Usuário já existe",
      },
    },

    invalidCredentials: {
      status: 401,
      response: {
        success: false,
        message: "Email ou senha inválidos",
      },
    },

    unauthorized: {
      status: 401,
      response: {
        success: false,
        message: "Não autorizado",
      },
    },

    forbidden: {
      status: 403,
      response: {
        success: false,
        message: "Acesso negado",
      },
    },

    notFound: {
      status: 404,
      response: {
        success: false,
        message: "Usuário não encontrado",
      },
    },

    validationError: {
      status: 400,
      response: {
        success: false,
        message: "Dados inválidos",
      },
    },

    internalError: {
      status: 500,
      response: {
        success: false,
        message: "Erro interno do servidor",
      },
    },
  },
};
