
interface Users {
    name: string;
    email: string;
    password: string;
    cpf: string;
    accountBalance: string;
    dateOfBirth: string;

}

export let users: Users[] = [

    { name: "", email: "mateslimabispo15@gmail.com", password: "mateus123", cpf: "", accountBalance: "", dateOfBirth: "" }
];

function userExiste(email: string): boolean {
    return users.some(user => user.email === email.trim());
}

function createdUser(email: string, password: string) {

    users.push({ name: "", email: email, password: password, cpf: "", accountBalance: "", dateOfBirth: "" });

};

function newDados(email: string, name: string, cpf: string, accountBalance: string, dateOfBirth: string) {

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

export {
    userExiste,
    createdUser,
    newDados,
    login
};