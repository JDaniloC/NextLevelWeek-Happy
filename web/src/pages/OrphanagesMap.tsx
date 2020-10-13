import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';

import mapMarkerImg from '../images/map-icon.svg'
import "../styles/pages/orphanages-map.css";
import 'leaflet/dist/leaflet.css';

export default function OrphanagesMap() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2> Escolha um orfanato no mapa </h2>
                    <p> Muitas crianças estão esperando a sua visita :) </p>
                </header>

                <footer>
                    <strong> Vitória de Santo Antão </strong>
                    <span> Pernambuco </span>
                </footer>
            </aside>
            
            <Map
                center={[-8.1158446,-35.3109454]}
                zoom = {15}
                style = {{ width: '100%', height: '100%' }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />  
            </Map>
            
            <Link to="" className="create-orphanage">
                <FiPlus size={52} color="#FFF"/>
            </Link>
        </div>
    );
}