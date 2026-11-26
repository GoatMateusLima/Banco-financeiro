
interface Users {
    id: string;
    name: string;
    email: string;
    password: string;
    cpf: string;
    accountBalance: number;
    dateOfBirth: string;
}

interface Extrato {
    id: string;
    remetente: string;
    destinatario: string;
    amount: number;
    date: number;
}

export let extrato: Extrato[] = [
    { id: "36b8eerd-df4e-4d49-b662-bcde71a8764f", remetente: "36b8f34d-df4e-4d49-b662-bcde71a8764f", destinatario: "47c9g95e-eg5f-5e50-c773-cdef82b9875g", amount: 10, date: Date.now() },
    { id: "36b8f34d-df4e-4d49-b662-bcde71a8764f", remetente: "47c9g95e-eg5f-5e50-c773-cdef82b9875g", destinatario: "36b8f34d-df4e-4d49-b662-bcde71a8764f", amount: 10, date: 23212007},
    { id: "47c9g95e-eg5f-5e50-c773-cdef82b9875g", remetente: "47c9g95e-eg5f-5e50-c773-cdef82b9875g", destinatario: "36b8f34d-df4e-4d49-b662-bcde71a8764f", amount: 10, date: 23122007}


]

export let users: Users[] = [

    { id: "36b8f34d-df4e-4d49-b662-bcde71a8764f", name: "MAria", email: "1", password: "mateus123", cpf: "232.456.233-34", accountBalance: 30, dateOfBirth: "14/04/2007" },
    { id: "47c9g95e-eg5f-5e50-c773-cdef82b9875g", name: "Jose", email: "2", password: "mateus123", cpf: "123.456.789-00", accountBalance: 30, dateOfBirth: "14/04/2007" }
];

function userExiste(email: string): boolean {
    return users.some(user => user.email === email.trim());
}

function createdUser(email: string, password: string) {

    users.push({ id: crypto.randomUUID(), name: "", email: email, password: password, cpf: "", accountBalance: 0, dateOfBirth: "" });

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

function saldo(email: string) {
    let usuario = users.find(u => u.email === email.trim());
    return `Saldo bancario de ${usuario?.accountBalance}`
}
function dadosPessoais(email: string) {
    let usuario = users.find(u => u.email === email.trim());
    console.table(usuario)
}

function transferirDinheiro(email: string, emailEnvio: string, trasnferencia: number) {
    let user1 = users.find(u => u.email === email.trim());
    let user2 = users.find(u => u.email === emailEnvio.trim());


    if (!user1 || !user2) {
        console.log("Usurairo nao encontrado, tente novamente")
        return;
    }

    if (user1 === user2) {
        console.log("voce nao pode enviar para essa mesma conta")
        return;
    }

    if (trasnferencia <= 0) {
        console.log("Valor de transferencia invalido")
        return;
    }

    if (user1.accountBalance < trasnferencia) {
        console.log("Saldo menor do que o esperado")
        return;
    }


    user1.accountBalance -= trasnferencia;
    user2.accountBalance += trasnferencia;


    extrato.push({ id: crypto.randomUUID(), remetente: user1.id, destinatario: user2.id, amount: trasnferencia, date: Date.now() });

    return `Transferencia de ${trasnferencia} realizada com sucesso para ${user2.name}`






}

function verExtrato(email: string, tipo: number, periodo: string, id: number) {
    let user1 = users.find(u => u.email === email.trim());
    let result;

    if (!user1) {
        return "Usurairo nao encontrado, tente novamente";
    }
    if (id === 1) {
        result = extrato.filter(u => u.remetente === user1.id ||
            u.destinatario === user1.id)

    }
    else if (id === 2) {
        result = extrato.filter(u => u.destinatario === user1.id)

    }
    else if (id === 3) {
        result = extrato.filter(u => u.remetente === user1.id)

    }
    else if (id === 4) {
        if (tipo === 1) {
            const dia = Number(periodo.slice(0, 2));
            const mes = Number(periodo.slice(2, 4));
            const ano = Number(periodo.slice(4, 8));
            let inicio = new Date(ano, mes -1, dia).getTime()
            let fim = new Date(ano, mes - 1, dia, 23, 59, 59, 999).getTime();
            result = extrato.filter(u => u.destinatario === user1.id && u.date >= inicio && u.date <= fim)
        }
        if (tipo === 2) {
            const dia = Number(periodo.slice(0, 2));
            const mes = Number(periodo.slice(2, 4));
            const ano = Number(periodo.slice(4, 8));
            let inicio = new Date(ano, mes -1, dia).getTime()
            let fim = new Date(ano, mes - 1, dia, 23, 59, 59, 999).getTime();
            result = extrato.filter(u => u.remetente === user1.id && u.date >= inicio && u.date <= fim)
        }
        if (tipo === 3) {

            const dia = Number(periodo.slice(0, 2));
            const mes = Number(periodo.slice(2, 4));
            const ano = Number(periodo.slice(4, 8));
            let inicio = new Date(ano, mes -1, dia).getTime()
            let fim = new Date(ano, mes - 1, dia, 23, 59, 59, 999).getTime();
            result = extrato.filter(u => u.remetente === user1.id  || u.destinatario === user1.id && u.date >= inicio && u.date <= fim)
        }

    }
    return result;
}
export {
    userExiste,
    createdUser,
    newDados,
    login,
    saldo,
    dadosPessoais,
    transferirDinheiro,
    verExtrato
};