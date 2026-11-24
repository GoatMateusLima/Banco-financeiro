import { createdUser, userExiste, newDados, login } from './users.ts';
import dg from './biblioteca/digitacao.ts'

let dgValor = "";
let loggedIn = ""

while (true) {

    try {
        console.clear();

        console.log('Seja bem vindo ao banco central!!!!');

        dgValor = await dg("1 - fazer login | 2 - Criar conta\n");

        if (dgValor === "1" || dgValor === "fazer login" || dgValor === "login") {
            const email = await dg("Digite seu email:");
            const password = await dg("Digite sua senha:");
            const usuarioLogado = login(email, password)

            if (usuarioLogado) {
                loggedIn = usuarioLogado;
                console.log(`Seja Bem Vindo Senhor ${loggedIn}`);
                getLoggedInUser(loggedIn)
                break;
            } else {
               console.log("Email ou senha incorretos, tente novamente")
               await dg("Pressione ENTER para tentar novamente...")
               dgValor = "1";
            }


        }
        else if (dgValor === "2" || dgValor === "criar conta" || dgValor === "criar") {

            console.log("Seja Bem vindo ao Banco Central");
            console.log("Vamos criar sua conta.")

            const email = await dg("Digite seu email: ")
            if (userExiste(email)) {
                console.log("Esse email ja existe, tente outro")
                //recuperaer conta, criar funcao
            } else {
                const password = await dg("Digite sua senha: ")
                createdUser(email, password)
                console.log("conta criada com sucesso")
                console.clear()
                console.log("vamos cadastrar seus dados referente a sua conta:")

                const name = await dg("Digite seu nome completo: \n")

                const cpf = await dg("Digite seu CPF")

                const accountBalance = await dg("Digite quanto de dinheiro voce tem:\n")

                const dateOfBirth = await dg("Digite sua data de nascimento:\n ")
                newDados(email, name, cpf, accountBalance, dateOfBirth)
                console.log("Tudo prontinho!!!!")
                console.log(`Seja bem vindo senhor ${name}`)
                await dg("\n Pressione ENTER para ir para tela de login.......")
                dgValor = "1"
            }


        } else {
            console.log("Opção inválida!");
            await dg("Pressione ENTER para tentar novamente...");
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

function getLoggedInUser(loggedIn: string) {
console.log("BANCO CENTRAL - USUARIO LOGADO: " + loggedIn);
const pergunta = dg("\n 1- Consultar Saldo \n 2-Transferir dinheiro \n 3- Consultar dados Pessoais \n 4- Sair da conta")



}