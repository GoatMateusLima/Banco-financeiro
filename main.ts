import { createdUser, userExiste, newDados, login, saldo, dadosPessoais, transferirDinheiro, verExtrato } from './users.ts';
import dg from './biblioteca/digitacao.ts'

let dgValor = "";
let loggedIn = ""

while (true) {

    try {
        console.clear();

        console.log('--------------Seja bem vindo ao banco central!!!!--------------');

        dgValor = await dg("1 - fazer login | 2 - Criar conta\n | 3- Fechar App\n");

        if (dgValor === "1" || dgValor === "fazer login" || dgValor === "login") {
            const email = await dg("Digite seu email:");
            const password = await dg("Digite sua senha:");
            const usuarioLogado = login(email, password)

            if (usuarioLogado) {
                loggedIn = usuarioLogado;
                console.log(`--------------Seja Bem Vindo Senhor ${loggedIn}--------------`);
                await getLoggedInUser(loggedIn)
            } else {
                console.log("Email ou senha incorretos, tente novamente")
                await dg("--------------Pressione ENTER para tentar novamente...--------------")
                dgValor = "1";
            }


        }
        else if (dgValor === "2" || dgValor === "criar conta" || dgValor === "criar") {

            console.log("--------------Seja Bem vindo ao Banco Central--------------");
            console.log("--------------Vamos criar sua conta.--------------")

            const email = await dg("Digite seu email: ")
            if (userExiste(email)) {
                console.log("Esse email ja existe, tente outro")
                //recuperaer conta, criar funcao
            } else {
                const password = await dg("Digite sua senha: ")
                createdUser(email, password)
                console.log("conta criada com sucesso")
                console.clear()
                console.log("--------------Vamos cadastrar seus dados referente a sua conta:--------------")

                const name = await dg("Digite seu nome completo: \n")

                const cpf = await dg("Digite seu CPF")

                const accountBalance = Number(await dg("Digite quanto de dinheiro voce tem:\n"))

                const dateOfBirth = await dg("Digite sua data de nascimento:\n ")
                newDados(email, name, cpf, accountBalance, dateOfBirth)
                console.log("Tudo prontinho!!!!")
                console.log(`Seja bem vindo senhor ${name}`)
                await dg("\n --------------Pressione ENTER para ir para tela de login.......--------------")
                dgValor = "1"
            }


        } else if (dgValor === "3" || dgValor === "fechar app" || dgValor === "fechar") {
            console.log("Obrigado por usar o Banco Central!");
            break;
        } else {
            console.log("Opção inválida!");
            await dg("--------------Pressione ENTER para tentar novamente...--------------");
            dgValor = "";
        }

    } catch (erro: any) {
        if (erro.message === 'RESTART') {
            dgValor = "";
            continue;
        }
        throw erro;
    }




};

async function getLoggedInUser(loggedIn: string) {
    while(true){
    console.log("BANCO CENTRAL - USUARIO LOGADO: " + loggedIn);

    const pergunta = await dg("\n 1- Consultar Saldo \n 2-Transferir dinheiro \n 3- Consultar dados Pessoais \n 4-Ver Extrato \n 5- Sair da conta \n")

    if (pergunta === "1" || pergunta === "consultar saldo" || pergunta === "saldo") {
        await consultarSaldo()
    } else if (pergunta === "2" || pergunta === "transferir dinheiro" || pergunta === "transferir") {
        await trasnferirDinheiro()
    } else if (pergunta === "3" || pergunta === "consultar dados" || pergunta === "dados") {
        await consultarDadosPessoais()
    } else if (pergunta === "4" || pergunta === "ver extrato" || pergunta === "extrato") {
        await Extrato()
    }
    else if (pergunta === "5" || pergunta === "sair") {
        loggedIn = ""
        dgValor = ""
    }

}
}

async function Extrato(){

    console.clear()
    let pergunta = await dg(" 1- Ver extrato completo \n 2- ver extrato de entradas \n 3- ver extrato de saidas \n 4- Ver extrato por periodo \n 5- Voltar para tela inicial\n")

    console.clear()

    if (pergunta === "1" || pergunta === "ver extrato completo" || pergunta === "extrato completo") {

        console.log("--------------Extrato Completo da Conta:--------------")
        console.log(verExtrato(loggedIn, 0, "", 1))
        await dg("Pressione ENTER para voltar para tela inicial")
    }

    if (pergunta === "2" || pergunta === "ver extrato de entradas" || pergunta === "extrato de entradas") {
        console.log("--------------Extrato de Entradas:--------------")
        console.log(verExtrato(loggedIn, 0, "", 2))
        await dg("Pressione ENTER para voltar para tela inicial")
    }

    if (pergunta === "3" || pergunta === "ver extrato de saidas" || pergunta === "extrato de saidas") {

        console.log("--------------Extrato de Saidas:--------------")
        console.log(verExtrato(loggedIn, 0, "", 3))
        await dg("Pressione ENTER para voltar para tela inicial")
    }

    if (pergunta === "4" || pergunta === "ver extrato por periodo" || pergunta === "extrato por periodo") {

        console.log("--------------Extrato por Periodo:--------------")

        let periodo = await dg("Digite o periodo\n")
        let tipo = Number(await dg("1- Entrada | 2- Saida | 3- Completo"))

        console.log(verExtrato(loggedIn, tipo, periodo, 4))

        await dg("Pressione ENTER para voltar para tela inicial")
    }

    if (pergunta === "5" || pergunta === "voltar para tela inicial" || pergunta === "voltar") {
        return
    }
    
    
}

async function consultarSaldo() {
    console.log(saldo(loggedIn))
    await dg("\n Pressione ENTER para ir para tela inicial.......")
}
async function trasnferirDinheiro() {
    let transferencia = Number(await dg("Quanto voce deseja tranferir?\n"))
    let emailEnvio = await dg("Digite o email do detinatario:\n")
    console.log(transferirDinheiro(loggedIn, emailEnvio, transferencia))
    await dg("\n Pressione ENTER para ir para tela inicial.......")
    
}
async function consultarDadosPessoais() {
    console.log(dadosPessoais(loggedIn))
    await dg("\n Pressione ENTER para ir para tela inicial.......")
}
