// PROJETO: Sistema da Biblioteca

// CLASSE 1: Livro

class Livro {
    titulo: string;
    autor: string;
    estaEmprestado: boolean;

    constructor(tituloDoLivro: string, autorDoLivro: string) {
        this.titulo = tituloDoLivro;
        this.autor = autorDoLivro;
        this.estaEmprestado = false;
    }
}

// CLASSE 2: Biblioteca

class Biblioteca {


    colecaoDeLivros: Map<string, Livro>;


    constructor() {

        this.colecaoDeLivros = new Map<string, Livro>();
    }


    private simularDemora(tempoEmMs: number = 50): Promise<void> {

        return new Promise(resolve => setTimeout(resolve, tempoEmMs));
    }

   
    adicionarNovoLivro(livroParaAdicionar: Livro): void {
       
        if (this.colecaoDeLivros.has(livroParaAdicionar.titulo)) {
            
            throw new Error(`O livro "${livroParaAdicionar.titulo}" já existe na estante.`);
        }

       
        this.colecaoDeLivros.set(livroParaAdicionar.titulo, livroParaAdicionar);
        console.log(`[INFO] O livro "${livroParaAdicionar.titulo}" foi guardado.`);
    }

   
    async tentarEmprestarLivro(tituloDoLivro: string): Promise<string> {
        
        await this.simularDemora();

       
        const livroEncontrado = this.colecaoDeLivros.get(tituloDoLivro);

       
        if (!livroEncontrado) {
          
            throw new Error(`Desculpe, não temos o livro "${tituloDoLivro}" na nossa biblioteca.`);
        }

        
        if (livroEncontrado.estaEmprestado === true) {
         
            throw new Error(`O livro "${tituloDoLivro}" já foi pego por outra pessoa.`);
        }

      
        livroEncontrado.estaEmprestado = true;
        return `[SUCESSO] Você pegou emprestado: "${tituloDoLivro}".`;
    }

   
    async tentarDevolverLivro(tituloDoLivro: string): Promise<string> {
        
        await this.simularDemora();

        
        const livroEncontrado = this.colecaoDeLivros.get(tituloDoLivro);

        
        if (!livroEncontrado) {
            throw new Error(`Este livro "${tituloDoLivro}" não parece ser da nossa biblioteca.`);
        }

        
        if (livroEncontrado.estaEmprestado === false) {
            throw new Error(`O livro "${tituloDoLivro}" já estava na estante, não tinha sido emprestado.`);
        }

        
        livroEncontrado.estaEmprestado = false;
        return `[SUCESSO] Obrigado por devolver: "${tituloDoLivro}".`;
    }
}


async function iniciarPrograma() {
    console.log("==================================================");
    console.log(" Bem-vindo ao Sistema da Biblioteca da Escola! ");
    console.log("==================================================");

    // Cria uma nova biblioteca
    const bibliotecaDaEscola = new Biblioteca();

    // --- ETAPA 1: Adicionar livros na estante ---
  
    try {
        console.log("\n[Etapa 1: Organizando a estante...]");
        bibliotecaDaEscola.adicionarNovoLivro(new Livro("Dom Casmurro", "Machado de Assis"));
        bibliotecaDaEscola.adicionarNovoLivro(new Livro("A Arte da Guerra", "Sun Tzu"));
        bibliotecaDaEscola.adicionarNovoLivro(new Livro("1984", "George Orwell"));
    } catch (erro) {
       
        if (erro instanceof Error) {
            console.error(`[ERRO GRAVE NA ETAPA 1] ${erro.message}`);
        }
    }

    // --- ETAPA 2: Teste de Empréstimo (Sucesso) ---
    console.log("\n[Etapa 2: Aluno tenta pegar '1984' (deve dar certo)]");
    try {
        
        const mensagem = await bibliotecaDaEscola.tentarEmprestarLivro("1984");
        console.log(mensagem); 
    } catch (erro) {
       
        if (erro instanceof Error) {
            console.error(`[FALHA INESPERADA] ${erro.message}`);
        }
    }

    // --- ETAPA 3: Teste de Empréstimo (Erro - Já Emprestado) ---
    console.log("\n[Etapa 3: Outro aluno tenta pegar '1984' (deve dar erro)]");
    try {
        const mensagem = await bibliotecaDaEscola.tentarEmprestarLivro("1984");
        console.log(mensagem); 
    } catch (erro) {
        
        console.log("-> Teste de erro (OK):");
        if (erro instanceof Error) {
            console.error(`[FALHA ESPERADA] ${erro.message}`);
        }
    }

    // --- ETAPA 4: Teste de Empréstimo (Erro - Não Existe) ---
    console.log("\n[Etapa 4: Aluno tenta pegar 'Harry Potter' (deve dar erro)]");
    try {
        const mensagem = await bibliotecaDaEscola.tentarEmprestarLivro("Harry Potter");
        console.log(mensagem); 
    } catch (erro) {
        
        console.log("-> Teste de erro (OK):");
        if (erro instanceof Error) {
            console.error(`[FALHA ESPERADA] ${erro.message}`);
        }
    }

    // --- ETAPA 5: Teste de Devolução (Sucesso) ---
    console.log("\n[Etapa 5: Aluno devolve '1984' (deve dar certo)]");
    try {
        const mensagem = await bibliotecaDaEscola.tentarDevolverLivro("1984");
        console.log(mensagem);
    } catch (erro) {
        if (erro instanceof Error) {
            console.error(`[FALHA INESPERADA] ${erro.message}`);
        }
    }

    // --- ETAPA 6: Teste de Devolução (Erro - Já Devolvido) ---
    console.log("\n[Etapa 6: Aluno tenta devolver '1984' de novo (deve dar erro)]");
    try {
        const mensagem = await bibliotecaDaEscola.tentarDevolverLivro("1984");
        console.log(mensagem); 
    } catch (erro) {
        
        console.log("-> Teste de erro (OK):");
        if (erro instanceof Error) {
            console.error(`[FALHA ESPERADA] ${erro.message}`);
        }
    }
    console.log("\n==================================================");
    console.log(" Fim dos testes do sistema! ");
    console.log("==================================================");
}

// Finalmente, chama a função principal para rodar tudo
iniciarPrograma();