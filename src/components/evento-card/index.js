import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import firebase from '../../config/firebase';

import './evento-card.css';

function EventoCard({id, img, titulo, dataInicial, dataFinal}){

    const [urlImagem, setUrlImagem] = useState();

    useEffect(() => {
        firebase.storage().ref(`imagens/${img}`).getDownloadURL().then(url => setUrlImagem(url));
    }, [img, urlImagem]);

    return(
        <div className="col-md-4 col-sm-12">
            <div className="card-body">
                <h5>{titulo}</h5>
                    <strong>Período: </strong>{dataInicial} a {dataFinal}
                <div className="row mt-3">
                    <div className="col-6">
                        <Link to={'/contractDetails/' + id} className="btn btn-sm btn-detalhes">+ Ver detalhes</Link>                    
                    </div>
                </div>

            </div>
        </div>
    )
}

export default EventoCard;