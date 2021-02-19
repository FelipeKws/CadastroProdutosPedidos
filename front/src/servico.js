import axios from 'axios';

const url = 'http://localhost:3000/api/';

class Servico {

    static insertPedido(numped, produtos, totdescont, totprodut, taxentrega, totpedido, accessToken){
        return axios.post(`${url}pedidos`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            "numped": numped,
            "produtos": produtos,
            "totdescont": totdescont,
            "totprodut": totprodut,
            "taxentrega": taxentrega,
            "totpedido": totpedido
        })
    }

    static deletePedido(id, accessToken){
        return axios.delete(`${url}pedidos/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    }

    static insertProduto(nome, descricao, categoria, preco, desconto, accessToken){
        return axios.post(`${url}produtos`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            "nome": nome,
            "descricao": descricao,
            "categoria": categoria,
            "preco": preco,
            "desconto": desconto
        })
    }

    static deleteProduto(id, accessToken){
        return axios.delete(`${url}produtos/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        })
    }
}

export default Servico