import React, { useState, useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase';
import Card from '../../components/evento-card/';
import Footer from '../../components/Footer';

function Home({ match }) {

  const [contracts, setContracts] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  let listaContracts = [];
  const usuarioEmail = useSelector(state => state.usuarioEmail);

  useEffect(() => {

    if (match.params.parametro) {
      firebase.firestore().collection('contracts').where('usuario', '==', usuarioEmail).get().then(async (resultado) => {
        await resultado.docs.forEach(doc => {
          if (doc.data().titulo.indexOf(pesquisa) >= 0) {
            listaContracts.push({
              id: doc.id,
              ...doc.data()
            })
          }
        })

        setContracts(listaContracts);
      });

    } else {
      firebase.firestore().collection('contracts').get().then(async (resultado) => {
        await resultado.docs.forEach(doc => {
          if (doc.data().titulo.indexOf(pesquisa) >= 0) {
            listaContracts.push({
              id: doc.id,
              ...doc.data()
            })
          }
        })
        setContracts(listaContracts);
      });
    }
  });
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row p-3 ">
          <h2 className="mx-auto p-5">Contratos Publicados</h2>
        </div>


        <div className="row p-3">
          {contracts.map(item => <Card 
          key={item.id} 
          id={item.id} 
          img={item.archive} 
          titulo={item.titulo} 
          dataInicial={item.dataInicial} 
          dataFinal={item.dataFinal} 
          nome={item.nome} 
          cpf={item.cpf} 
          telefone={item.telefone}
        />)}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home;