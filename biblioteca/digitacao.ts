
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { users } from '../users.ts'

const rl = readline.createInterface({ input, output });

rl.on('close', () => {
    console.log('[DEBUG] Interface readline fechada!');
});

process.on('SIGINT', () => {
    console.log('[DEBUG] CTRL+C detectado!');
});

const comandos: Record<string, () => void> = {
    '/banco': () => {
        console.log("\n [ADMIN] Abrindo banco de usuarios.....");
        console.table(users)
    },
    '/help': () => {
        console.log("\n [ADMIN] Comandos globais:");
    },
    '/stop': () => {
        console.log("\n Encerrando sistema...");
        rl.close();
        process.exit(0);
    },
    '/restart': () => {
        //kknjjjjj 
    }
}

export default async function dg(texto: string): Promise<string> {
    while (true) {
        const valor = (await rl.question(texto)).trim();
        if (valor.startsWith('/')) {
            if (valor === '/restart') {
                throw new Error('RESTART')
            }
            if (comandos[valor]) {
                comandos[valor]()
            } else {
                console.log(`Comando '${valor}' não existe. Digite /help`)
            }

            continue;

        }

        return valor;
    }


}
