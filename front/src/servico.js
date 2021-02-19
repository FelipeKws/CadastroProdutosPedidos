import axios from 'axios';

const url = 'http://localhost:3000/api/';

class Servico {
    static getPedido(){
        return new Promise((resolve, reject) => {
            try {
                const res = axios.get(`${url}pedidos`);
                const data = res.data;
                resolve(
                    data.map(pedido => ({
                        ...pedido
                    }))
                )
            } catch (err) {
                reject(err)
            }
        })
    }

    static insertPedido(numped, produtos, totdescont, totprodut, taxentrega, totpedido){
        return axios.post(`${url}pedidos`, {
            "numped": numped,
            "produtos": [produtos],
            "totdescont": totdescont,
            "totprodut": totprodut,
            "taxentrega": taxentrega,
            "totpedido": totpedido
        })
    }

    static deletePedido(id){
        return axios.delete(`${url}pedidos/${id}`)
    }

    static insertProduto(nome, descricao, categoria, preco, desconto){
        return axios.post(`${url}produtos`, {
            "nome": nome,
            "descricao": descricao,
            "categoria": categoria,
            "preco": preco,
            "desconto": desconto
        })
    }

    static deleteProduto(id){
        return axios.delete(`${url}produtos/${id}`)
    }
}

export default Servico