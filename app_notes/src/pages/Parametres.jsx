import React from 'react';
import AppNavbar from '../components/AppNavbar';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Categorie from './../components/Categorie'
const Parametres = () => {
    return (
        <div>

            <h1>Paramètres</h1>

        <hr />
        <p></p>

           <Button className="button-c" as={Link} to="/creation-categorie">Créer une catégorie</Button>

        <hr />

        <p></p>

        <Categorie />


        </div>
    );
};

export default Parametres;