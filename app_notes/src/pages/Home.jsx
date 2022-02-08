import React from "react";
import AppNavbar from "../components/AppNavbar";
import {Card, Button, Table, ListGroup} from "react-bootstrap"
import { Link } from 'react-router-dom'
import PageCarnet from "../components/Carnet/PageCarnet";



const home = () =>{

    return(
        <>
        
            <Button  as={Link} to="/creation-carnet" variant="success" type="submit" className="button-notes-a">
              Ajouter
            </Button>

        <hr />

        <PageCarnet />

        </>
    )
}

export default home;