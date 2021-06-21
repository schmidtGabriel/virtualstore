const ACTION_LIST = require('./constants.js');

const messageList = [ 
    {"$success": {"code": 0, "msg": "Operação realizada com sucesso!", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 1, "msg": "Opa, deu algum um erro inesperado, reinicia o app e tenta de novo por favor!", "info": "", "action": ACTION_LIST.CRASH}},
    {"$error": {"code": 2, "msg": "O seu acesso expirou! Por motivos de segurança, se autêntique novamente!", "info": "", "action": ACTION_LIST.LOGOUT}},
    {"$error": {"code": 3, "msg": "Faltou preencher um campo!", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 4, "msg": "Essa inscrição não existe", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 5, "msg": "Senha/E-mail inválida :(", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 6, "msg": "Campo não corresponde com as politicas", "info": "", "action": ACTION_LIST.BACK}},
    {"$error": {"code": 7, "msg": "Campo inválido :(", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 8, "msg": "Essa inscrição já existe :O", "info": "", "action": ACTION_LIST.BACK}},
    {"$error": {"code": 9, "msg": "Opa, só os usuários PRO podem recarregar outros telefones ;)", "info": "", "action": ACTION_LIST.HOME}},
    {"$error": {"code": 10, "msg": "Poxa, esse método de pagamento está indisponível :/", "info": "", "action": ACTION_LIST.BACK}},
    {"$error": {"code": 11, "msg": "Falha ao efetuar pagamento :/", "info": "", "action": ACTION_LIST.HOME}},
    {"$error": {"code": 12, "msg": "É para sua segurança! Espera um pouco pfv:", "info": '15 segundos', "action": ACTION_LIST.MSG}},
    {"$error": {"code": 13, "msg": "Você pode tentar mais tarde pfv!?", "info": "", "action": ACTION_LIST.HOME}},
    {"$error": {"code": 14, "msg": "E-mail já cadastrado", "info": "Caso não lembre a senha, você pode recupera-la", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 15, "msg": "Falha ao efetuar recarga :/", "info": "", "action": ACTION_LIST.BACK}},
    {"$error": {"code": 16, "msg": " Opa, só os usuários PRO podem fazer transferências", "info": "", "action": ACTION_LIST.HOME}},
    {"$error": {"code": 17, "msg": " Opa, só os usuários PRO podem vender os Planos", "info": "", "action": ACTION_LIST.HOME}},
    {"$error": {"code": 18, "msg": "Esse usuário já possui um plano", "info": "", "action": ACTION_LIST.HOME}},
    {"$error": {"code": 19, "msg": "Erro ao Autenticar!", "info": "", "action": ACTION_LIST.BACK}},
    {"$error": {"code": 20, "msg": " Opa, só os usuários PRO podem recarregar utilizando a carteira UUDI", "info": "", "action": ACTION_LIST.HOME}},
    {"$error": {"code": 21, "msg": "Ixi, limite de recarga por dia alcançado!.", "info": "Para aumentar o limite, favor entrar em contato com o suporte.", "action": ACTION_LIST.HOME}},
    {"$error": {"code": 22, "msg": "Não encontrado", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 23, "msg": "Informamos que o cartão de credito para compras de recargas está temporariamente suspenso pois estamos implementando medidas de segurança para melhor atende-los.\n\nAcesse o link abaixo para mais informações de como fazer sua recarga depositando dinheiro na sua carteira UUDI.\n\nhttp://uudi.com.br/depositocarteirauudi", "info": "", "action": ACTION_LIST.HOME}},
    {"$error": {"code": 24, "msg": "Ixi, limites de planos por dia alcançado!", "info": "", "action": ACTION_LIST.HOME}},
    {"$error": {"code": 25, "msg": "Deu erro na recarga. Atualiza o app e tenta de novo pfv! ;)", "info": "Para aumentar o limite, favor entrar em contato com o suporte.", "action": ACTION_LIST.HOME}},
    {"$error": {"code": 26, "msg": "Deu erro na recarga. Tenta de novo pfv! ;)", "info": "", "action": ACTION_LIST.HOME}},
    {"$error": {"code": 27, "msg": " Deu erro na compra do plano. Atualiza o app e tenta de novo pfv! ;)", "info": "", "action": ACTION_LIST.BACK}},
    {"$error": {"code": 28, "msg": " Deu erro na compra do plano. Tenta de novo pfv! ;)", "info": "", "action": ACTION_LIST.HOME}},
    {"$error": {"code": 29, "msg": "Deu erro ao transferir. Atualiza o app e tenta de novo pfv! ;).", "info": "", "action": ACTION_LIST.BACK}},
    {"$error": {"code": 30, "msg": "Telefone já confirmado", "info": "", "action": ACTION_LIST.HOME}},
    {"$error": {"code": 31, "msg": "Codigo de confirmação inválido :/", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 32, "msg": " Atualiza o app e tenta de novo pfv! ;).", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 33, "msg": "Seu cadastro está completo, porém é necessário aguardar até 48h para a equipe UUDI validá-lo. Fique à vontade para tentar quantas vezes quiser e verificar se o cadastro já está aprovado.", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 34, "msg": "Esse telefone já está cadastrado!", "info": "", "action": ACTION_LIST.MSG}},
    {"$success": {"code": 35, "msg": "Olá! Tudo certo por aí? Muitíssimo obrigado pela pergunta! Elas sempre ajudam pra gente melhorar nosso produto :) \nVamos entender o seu problema e já te respondemos, beleza?", "info": "", "action": ACTION_LIST.MSG}},
    {"$success": {"code": 36, "msg": "Seu comprovante foi enviado! Mas é necessário aguardar até 48h para a equipe UUDI validar a compensação do depósito, tá certo? \nAssim que confirmarmos o depósito, o valor será disponibilizado em sua carteira UUDI :)", "info": "", "action": ACTION_LIST.HOME}},
    {"$error": {"code": 37, "msg": "Em breve!", "info": "", "action": ACTION_LIST.MSG}},
    {"$success": {"code": 38, "msg": "Pedido registrado com sucesso, agora basta aguardar a confirmação do estabelecimento", "info": "", "action": ACTION_LIST.ORDER}},
    {"$success": {"code": 39, "msg": "Encaminhamos uma nova senha para o e-mail registrado. Por favor verifique sua caixa de entrada em alguns minutos!", "info": "", "action": ACTION_LIST.BACK}},
    {"$success": {"code": 40, "msg": "Seu cadastro foi atualizado com sucesso! Obrigado por mante-lo atualizado.", "info": "", "action": ACTION_LIST.BACK}},
    {"$error": {"code": 41, "msg": "Seu acesso está temporáriamente bloqueado!", "info": "", "action": ACTION_LIST.LOGOUT}},
    {"$error": {"code": 42, "msg": "Seu usuário não tem acesso ao painel administrativo!", "info": "", "action": ACTION_LIST.LOGOUT}},
    {"$error": {"code": 43, "msg": "Seu usuário tem acesso ao painel, porém não foi associado a nenhum estabelecimento, procure o administrador do sistema.", "info": "", "action": ACTION_LIST.LOGOUT}},
    {"$error": {"code": 44, "msg": "A validade do cupom promocional encontra-se expirada!", "info": "", "action": ACTION_LIST.BACK}},
    {"$error": {"code": 45, "msg": "Este cupom promocional já foi utilizado!", "info": "", "action": ACTION_LIST.BACK}},
    {"$error": {"code": 46, "msg": "Você não pode usar este cupom promocional mais de uma vez!", "info": "", "action": ACTION_LIST.BACK}},
    {"$error": {"code": 47, "msg": "Este voucher está suspenso, temporariamente!", "info": "", "action": ACTION_LIST.BACK}},
    {"$error": {"code": 48, "msg": "O valor do cupom deve ser inferior ao valor do pedido!", "info": "Adicionais e frete não contam.", "action": ACTION_LIST.BACK}},
    {"$error": {"code": 49, "msg": "Este código promocional não é válido.", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 50, "msg": "Usuário sem permissão para preencher este campo!", "action": ACTION_LIST.MSG}},
    {"$success": {"code": 51, "msg": "O dependente foi adicionado com sucesso!", "info": "", "action": ACTION_LIST.BACK}},
    {"$success": {"code": 52, "msg": "Abastecimento registrado com sucesso!", "info": "", "action": ACTION_LIST.BACK}},
    {"$success": {"code": 53, "msg": "Recebemos sua mensagem com sucesso! Logo entraremos em contato.", "info": "", "action": ACTION_LIST.BACK}},
    {"$success": {"code": 54, "msg": "A revisão de seu veículo foi agendada com sucesso!", "info": "", "action": ACTION_LIST.BACK}},
    {"$success": {"code": 55, "msg": "Recebemos sua solicitação, entraremos em contato o mais breve possível!", "info": "", "action": ACTION_LIST.BACK}},
    {"$success": {"code": 56, "msg": "Dependente excluído com sucesso!", "info": "", "action": ACTION_LIST.BACK}},
    {"$error": {"code": 57, "msg": "Agendamento não solicitado. É necessário selecionar pelo menos um serviço para essa operação. Tente novamente.", "action": ACTION_LIST.MSG}},
    {"$success": {"code": 58, "msg": "O convênio foi adicionado com sucesso!", "info": "", "action": ACTION_LIST.BACK}},
    {"$success": {"code": 59, "msg": "Convênio excluído com sucesso!", "info": "", "action": ACTION_LIST.BACK}},
    {"$success": {"code": 60, "msg": "Interesse(s) adicionado(s) com sucesso!", "info": "", "action": ACTION_LIST.BACK}},
    {"$success": {"code": 61, "msg": "Interesse excluído com sucesso!", "info": "", "action": ACTION_LIST.BACK}},
    {"$success": {"code": 62, "msg": "A SubEspecialidade foi adicionada com sucesso!", "info": "", "action": ACTION_LIST.BACK}},
    {"$success": {"code": 63, "msg": "SubEspecialidade excluída com sucesso!", "info": "", "action": ACTION_LIST.BACK}},
    {"$success": {"code": 64, "msg": "O estabelecimento foi adicionado com sucesso!", "info": "", "action": ACTION_LIST.BACK}},
    {"$success": {"code": 65, "msg": "Estabelecimento excluído com sucesso!", "info": "", "action": ACTION_LIST.BACK}},
    {"$success": {"code": 66, "msg": "A Forma de Pagamento foi adicionada com sucesso!", "info": "", "action": ACTION_LIST.BACK}},
    {"$success": {"code": 67, "msg": "Forma de Pagamento excluída com sucesso!", "info": "", "action": ACTION_LIST.BACK}},
    {"$error": {"code": 68, "msg": "Este horário não está mais disponível!", "info": "", "action": ACTION_LIST.BACK}},
    {"$error": {"code": 69, "msg": "CPF inválido!", "info": "", "action": ACTION_LIST.MSG}},
    {"$success": {"code": 70, "msg": "Cartão excluído com sucesso!", "info": "", "action": ACTION_LIST.BACK}},
    {"$error": {"code": 71, "msg": "Este prestador já possui um plano ativo!", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 72, "msg": "Este prestador já está desativado!", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 73, "msg": "Este usuário precisa escolher um plano primeiro!", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 74, "msg": "Este usuário precisa cadastrar/escolher um cartão de crédito!", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 75, "msg": "Este plano não foi encontrado na Moip/Wirecard, procure o administrador do sistema!", "info": "", "action": ACTION_LIST.MSG}},  
    {"$error": {"code": 76, "msg": "Este usuário não foi encontrado na Moip/Wirecard, procure o administrador do sistema!", "info": "", "action": ACTION_LIST.MSG}},  
    {"$error": {"code": 77, "msg": "O pagamento não pode ser realizado! Por favor tente novamente e se o problema persistir entre em contato conosco através do suporte.", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 78, "msg": "Um plano deve não pode custar apenas centavos! Deve custar no mínimo R$ 1,00 ou ser gratuito com o valor de R$ 0,00.", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 79, "msg": "Não foi possível criar a assinatura na Moip, procure o administrador do sistema!", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 80, "msg": "Não foi possível efetuar sua retirada! Para realizar é necessário ter um saldo mínimo disponível para saque de R$ 5,00 (um real).", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 81, "msg": "Não foi possivel realizar a transferência! Por favor tente novamente e se o problema persistir entre em contato conosco através do suporte.", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 82, "msg": "Não foi possivel cancelar o agendamento! O agendamento só pode ser cancelado enquanto não for confirmado por um profissional, em caso de dúvidas procure o suporte.", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 83, "msg": "Não foi possível adicionar/transferir o crédito! O valor mínimo deve ser de R$ 1,00.", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 84, "msg": "Você não possui saldo suficiente para realizar a transferência.", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 85, "msg": "Você ja marcou este bloco!.", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 86, "msg": "Não é permitido excluir leilões que ja receberam ofertas, por favor opite pela opção de cancelamento.", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 87, "msg": "O valor da ofertado tem que ser superior ao valor mínimo de oferta!", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 88, "msg": "O valor da ofertado tem que ser superior ao maior valor já ofertado!", "info": "", "action": ACTION_LIST.MSG}},
    {"$success": {"code": 89, "msg": "O bloco marcado temporariamente, marcaremos o bloco definitivamente assim que o pagamento for aprovado!", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 90, "msg": "Para criar/alterar um grupo ele deve conter pelo menos um membro.", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 91, "msg": "Este leilão está encerrado!", "info": "", "action": ACTION_LIST.MSG}},
    {"$error": {"code": 92, "msg": "Este leilão foi cancelado!", "info": "", "action": ACTION_LIST.MSG}},
];

const length = messageList.length - 1;

module.exports = function (code, info, action) {
  code = code > length ? 1 : code;
  let message = JSON.parse(
    JSON.stringify(
      messageList[code]
    )
  );
  if(message.$success){
    message.$success.info = !!info ? info : message.$success.info;
    message.$success.action = !!action ? action : message.$success.action;
  } else {
    message.$error.info = !!info ? info : message.$error.info;
    message.$error.action = !!action ? action : message.$error.action;
  }
  return message;
};

/*
*  MODELO
{
  "modelo": {
    "$error": {
      "code": 21,
      "msg": "Mensagem Titulo",
      "info": "Informações extras",
      "action": "#BACK"
    }
  },
  "actionList": {
    "#BACK": "Volta para tela anterior",
    "#OFF": "Problema com a internet",
    "#MSG": "Só exibe a msg de erro",
    "#NOT": "Não faz nada",
    "#LOGOUT": "Fazer logaut do usuário",
    "#HOME": "Retorna para a HOME",
    "#CRASH": "Fecha a aplicação"
  }
}
*/