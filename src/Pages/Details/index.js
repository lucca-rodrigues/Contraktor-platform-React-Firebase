import React, { useState, useEffect } from 'react';
import './evento-detalhes.css';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../config/firebase';
import { useSelector } from 'react-redux';
import Navbar from '../../components/navbar/';
import {FaEye} from 'react-icons/fa'
import Footer from '../../components/Footer';

function ContractDetalhes(props) {

  const [contract, setContract] = useState({});
  const [urlImg, setUrlImg] = useState();
  const usuarioLogado = useSelector(state => state.usuarioEmail);
  const [carregando, setCarregando] = useState(1);
  const [excluido, setExcluido] = useState(0);

  function remover() {
    firebase.firestore().collection('contracts').doc(props.match.params.id).delete().then(() => {
      setExcluido(1);
    })
  }

  useEffect(() => {
    if (carregando) {
      firebase.firestore().collection('contracts').doc(props.match.params.id).get().then(resultado => {
        setContract(resultado.data())
        firebase.storage().ref(`imagens/${resultado.data().archive}`).getDownloadURL().then(url => {
          setUrlImg(url)
          setCarregando(0);
        });
      });
    } else {
      firebase.storage().ref(`imagens/${contract.archive}`).getDownloadURL().then(url => setUrlImg(url))
    }
  }, [carregando, contract.archive, props.match.params.id])

  return (
    <>
      <Navbar />

      {excluido ? <Redirect to='/' /> : null}

      <div className="container">
        {carregando ? <div className="row mt-5"> <div class="spinner-border text-danger mx-auto" role="status"><span class="sr-only"></span></div> </div>
            :
            <div>       
              <div className="row box-detalhes mt-5">
                <div className="col-12 text-center">
                  <h5><strong>Detalhes do Contrato</strong></h5>
                </div>
                <div className="col-12 text-center mt-5">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Titulo</th>
                        <th scope="col">Data Inicial</th>
                        <th scope="col">Data Final</th>
                        <th scope="col">Nome</th>
                        <th scope="col">CPF</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{contract.titulo}</th>
                        <td>{contract.dataInicial}</td>
                        <td>{contract.dataFinal}</td>
                        <td>{contract.nome}</td>
                        <td>{contract.cpf}</td>
                        <td>{contract.telefone}</td>
                        <td>
                          <a href={urlImg} target="_blank">
                            <FaEye />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>


              </div>

              {
                usuarioLogado === contract.usuario ? <button onClick={remover} type="button" align="right" className="btn btn-lg mt-3 mb-5 btn-cadastro">Remover Contrato </button>
                  : null
              }

            </div>

        }
      </div>
      <Footer />

    </>
  )
}

export default ContractDetalhes;