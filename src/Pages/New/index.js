import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './style.css';
import { Redirect } from 'react-router-dom';
import Navbar from '../../components/navbar/';

import firebase from '../../config/firebase';



function EventoCadastro(props) {
    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [titulo, setTitulo] = useState();
    const [dataInicial, setDataInicial] = useState();
    const [dataFinal, setDataFinal] = useState();
    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [telefone, setTelefone] = useState();
    const [archive, setArchive] = useState();
    const [newArchive, setNewArchive] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);


    const storage = firebase.storage();
    const db = firebase.firestore();

    useEffect(() => {
        if (props.match.params.id) {
            firebase.firestore().collection('contracts').doc(props.match.params.id).get().then(resultado => {
                setTitulo(resultado.data().titulo)
                setDataInicial(resultado.data().dataInicial)
                setDataFinal(resultado.data().dataFinal)
                setNome(resultado.data().data)
                setCpf(resultado.data().cpf)
                setTelefone(resultado.data().telefone)
                setArchive(resultado.data().archive)
            })
        }
    }, [carregando, props.match.params.id])

    // function atualizar(){
    //     setMsgTipo(null);
    //     setCarregando(1);

    //     if(fotoNova)    
    //     storage.ref(`imagens/${fotoNova.name}`).put(fotoNova);

    //         db.collection('contracts').doc(props.match.params.id).update({
    //             titulo: titulo,
    //             tipo: tipo,
    //             detalhes: detalhes,
    //             data: data,
    //             hora: hora,
    //             foto: fotoNova ? fotoNova.name : archive            
    //         }).then(() => {
    //             setMsgTipo('sucesso');
    //             setCarregando(0);
    //         }).catch(erro => {
    //             setMsgTipo('erro');
    //             setCarregando(0);
    //     });
    // }

    function cadastrar() {
        setMsgTipo(null);
        setCarregando(1);

        storage.ref(`imagens/${newArchive.name}`).put(newArchive).then(() => {
            db.collection('contracts').add({
                titulo: titulo,
                dataInicial: dataInicial,
                dataFinal: dataFinal,
                nome: nome,
                cpf: cpf,
                telefone: telefone,
                usuario: usuarioEmail,
                archive: newArchive.name,
                publico: 1,
                criacao: new Date()
            }).then(() => {
                setMsgTipo('sucesso');
                setCarregando(0);
            }).catch(erro => {
                setMsgTipo('erro');
                setCarregando(0);
            });
        });
    }


    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-6 mt-5 ">
                        <h1 className="text-center">Cadastro de Contratos</h1>

                        <form>
                            <div className="form-group">
                                <label>Título:</label>
                                <input onChange={(e) => setTitulo(e.target.value)} type="text" className="form-control" value={titulo && titulo} placeholder="Título do Contrato" />
                            </div>

                            <div className="form-group">
                                <label>Data Inicial:</label>
                                <input onChange={(e) => setDataInicial(e.target.value)} type="text" className="form-control" value={dataInicial && dataInicial} placeholder="DD/MM/AA"/>
                            </div>

                            <div className="form-group">
                                <label>Data Final:</label>
                                <input onChange={(e) => setDataFinal(e.target.value)} type="text" className="form-control" value={dataFinal && dataFinal} placeholder="DD/MM/AA"/>
                            </div>
                            <div className="form-group">
                                <label>Nome:</label>
                                <input onChange={(e) => setNome(e.target.value)} type="text" className="form-control" value={nome && nome} placeholder="Nome Completo" />
                            </div>
                            <div className="form-group">
                                <label>CPF:</label>
                                <input onChange={(e) => setCpf(e.target.value)} type="text" className="form-control" value={cpf && cpf} placeholder="999.999.999-99" />
                            </div>
                            <div className="form-group">
                                <label>Telefone:</label>
                                <input onChange={(e) => setTelefone(e.target.value)} type="text" className="form-control" value={telefone && telefone} placeholder="(99) 9999-9999" />
                            </div>

                            <div className="form-group">
                                <label>Upload da Foto {props.match.params.id ? '(caso queira manter a mesma foto, não precisa escolher uma nova imagem!)' : null}:</label>
                                <input onChange={(e) => setNewArchive(e.target.files[0])} type="file" className="form-control" />
                            </div>

                            <div className="row d-flex justify-content-center">
                                {
                                    carregando > 0 ? <div class="spinner-border text-danger mx-auto" role="status"><span class="sr-only">Loading...</span></div>
                                        : <button onClick={cadastrar} type="button" className="btn btn-lg mt-3 mb-5 btn-cadastro">Cadastrar</button>
                                }
                            </div>

                        </form>

                        <div className="msg-login text-center mt-2">
                            {msgTipo === 'sucesso' && <span><strong></strong> Evento Publicado &#128526; </span> && <Redirect to="/home" />}
                            {msgTipo === 'erro' && <span><strong>Ops!</strong> Não foi possível publicar o evento! &#128546; </span>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventoCadastro;