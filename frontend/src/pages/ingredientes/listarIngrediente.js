import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '../../components/menu';
import '../../styles/css/global.css';
import gadoSeguro from '../../services/connectionGadoSeguro';

const ListarIngrediente = () => {
    const [ingredientes, setIngrediente] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIngredientes = async () => {
            try {
                const response = await gadoSeguro.get('/ingrediente');
                console.log("response: " + response.data);
                setIngrediente(response.data);
            } catch (error) {
                console.error("erro ao listar ingrediente: ", error);
            }
        };

        fetchIngredientes();
    }, []);

    const deletarIngrediente = async (ingredienteId) => {
        console.log("--ID: ", ingredienteId);
        try {
            const response = await gadoSeguro.delete(`/ingrediente/${ingredienteId}`);
            console.log("eita apagou: ", response.data);

            console.log("apagou com sucesso");
        } catch (error) {
            console.error("erro ao deletar fazenda: ", error);
        }
    };

    return (
        <div id="wrapper" style={{ background: "#F0F1DF" }}>
            <Menu />
            <h1 className="fs-1 text-center" style={{ background: "#E0E7CA", padding: "20px" }}>Ingredientes cadastrados no sistema</h1>
            <div className="t" style={{ margin: "5%", marginLeft: "10%", marginRight: "20%" }}>
                <div className="text-center" style={{ marginBottom: "5%" }}><button className="botaoCadastrarListarIngrediente btn btn-success" style={{ backgroundColor: "#83A93A", borderColor: "#6D3B00" }} variant="warning" onClick={e => navigate('/ingredientes/cadastrarIngrediente')}>Cadastrar Ingrediente</button></div>

                <table className="table table-bordered table-bordered" >
                    <thead className="text-center" style={{ backgroundColor: "#E0E7CA" }}>
                        <tr>
                            <th style={{ backgroundColor: "#cdd8a9" }} scope="col">Nome</th>
                            <th style={{ backgroundColor: "#cdd8a9" }} scope="col">Quantidade Estoque</th>
                            <th style={{ backgroundColor: "#cdd8a9" }} scope="col">Unidade</th>
                            <th style={{ backgroundColor: "#cdd8a9" }} ></th>
                        </tr>
                    </thead>

                    <tbody className="text-center">
                        {ingredientes.map(ingrediente => (
                            <tr key={ingrediente.idIngrediente}>
                                <td >{ingrediente.nome}</td>
                                <td >{ingrediente.qnt_estoque}</td>
                                <td >{ingrediente.unidade}</td>
                                <td style={{ display: "flex", justifyContent: "space-evenly" }}>

                                    <button className="botaoEditar btn btn-primary" style={{ color: "white", textDecoration: "none", margin: "2%", backgroundColor: "#47a2ed", border: "none" }}
                                        variant="warning"
                                        onClick={() => navigate(`/ingredientes/editarIngrediente/${ingrediente.idIngrediente}`, { state: { ingrediente } })}
                                    >
                                        Editar
                                        <span className="editar">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" color='white' viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>
                                        </span>
                                    </button>

                                    <button className="botaoApagar   btn btn-danger"
                                        style={{ color: "white", textDecoration: "none", margin: "2%", backgroundColor: "#d10606", border: "none" }} variant="warning"
                                        onClick={() => deletarIngrediente(ingrediente.idIngrediente)}
                                    >
                                        Deletar
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" color='white' viewBox="0 0 16 16">
                                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                            </svg>
                                        </span>
                                    </button>
                                </td>

                            </tr>

                        ))}


                    </tbody>

                </table>

            </div>
        </div>
    );

}


export default ListarIngrediente;