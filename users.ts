
interface Users {
    name: string;
    email: string;
    password: string;
    cpf: string;
    accountBalance: number;
    dateOfBirth: string;

}

export let users: Users[] = [

    { name: "MAria", email: "1", password: "mateus123", cpf: "232.456.233-34", accountBalance: 30, dateOfBirth: "14/04/2007" },
    { name: "Jose", email: "mates15@gmail.com", password: "mateus123", cpf: "123.456.789-00", accountBalance: 30, dateOfBirth: "14/04/2007" }
];

function userExiste(email: string): boolean {
    return users.some(user => user.email === email.trim());
}

function createdUser(email: string, password: string) {

    users.push({ name: "", email: email, password: password, cpf: "", accountBalance: 0, dateOfBirth: "" });

};

function newDados(email: string, name: string, cpf: string, accountBalance: number, dateOfBirth: string) {

    let usuario = users.find(u => u.email === email.trim());
    if (!usuario) return;

    if (!usuario.name && !usuario.cpf && !usuario.accountBalance && !usuario.dateOfBirth) {
        usuario.name = name
        usuario.cpf = cpf
        usuario.accountBalance = accountBalance
        usuario.dateOfBirth = dateOfBirth
    }
}

function login(email: string, password: string) {
    const usuario = users.find(u => u.email === email.trim() && u.password === password.trim())
    if (!usuario) {
        return null;
    }
    return usuario.email;
}

function saldo(email: string){
    let usuario = users.find(u => u.email === email.trim());
    return `Saldo bancario de ${usuario?.accountBalance}`
}
function dadosPessoais(email: string){
    let usuario = users.find(u => u.email === email.trim());
    console.table(usuario)
}

function transferirDinheiro(email:string, emailEnvio:string, trasnferencia: number){
    let user1 = users.find(u => u.email === email.trim());
    let user2 = users.find(u => u.email === emailEnvio.trim());

    if( !user1 || !user2){
        console.log("Usurairo nao encontrado, tente novamente")
        return;
    }

    if(user1 === user2){
        console.log("voce nao pode enviar para essa mesma conta")
        return;
    }

    if(trasnferencia <= 0){
        console.log("Valor de transferencia invalido")
        return;
    }

    if( user1.accountBalance < trasnferencia){
        console.log("Saldo menor do que o esperado")
        return;
    }

    if( user1.email === email && user2.email === emailEnvio){
        user1.accountBalance -= trasnferencia;
        user2.accountBalance += trasnferencia;
        return `Transferencia de ${trasnferencia} realizada com sucesso para ${user2.name}`
    }
    


}
export {
    userExiste,
    createdUser,
    newDados,
    login,
    saldo,
    dadosPessoais,
    transferirDinheiro
};