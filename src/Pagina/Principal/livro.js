import axios from 'axios';


async function getListaLivro() {           
    const url = "http://localhost:8081/Livro" 
    const response = await axios.get(url)    
    return response
}

async function getLivro(id) {
    const url = `http://localhost:8081/Livro/${id}`;    

    const response = await axios.get(url);
    return response.data
}

async function ExcluirLivro(id) {
    const url = `http://localhost:8081/Livro/${id}`;        
    const response = await axios.delete(url)
    return response
}

async function CadastrarLivro(livro) {
    let url = "http://localhost:8081/Livro/"

    let metodo = 'post'
    if (livro.livro_id > 0) {
        metodo = 'put'
        url = url + livro.livro_id 

    }
    const response = await axios({
        method: metodo,
        url: url,
        data: livro        
    })
    return response
}

const LivroRequest = {
    getListaLivro,
    CadastrarLivro,
    ExcluirLivro,
    getLivro
}

export default LivroRequest