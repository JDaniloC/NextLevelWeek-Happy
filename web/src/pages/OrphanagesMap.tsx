import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map-icon.svg'
import "../styles/pages/orphanages-map.css";
import 'leaflet/dist/leaflet.css';
import mapIcon from "../utils/mapIcon";
import api from "../services/api";
import Orphanage from './Orphanage';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

export default function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    
    useEffect(() => {
        api.get("/orphanages").then(response => {
            setOrphanages(response.data);
        });
    }, []);

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
                
                {orphanages.map(orphanage => (
                    <Marker 
                        key = {orphanage.id}
                        icon = {mapIcon}
                        position = {[orphanage.latitude, orphanage.longitude]}
                    >
                        <Popup classButton = {false} minWidth = {248} 
                            maxWidth = {248} className = "map-popup"> 
                            {orphanage.name}
                            <Link to={`/orphanages/${orphanage.id}`}>
                                <FiArrowRight size = {20} color = "#FFF"/>
                            </Link>
                        </Popup>
                    </Marker>
                ))}
            </Map>
            
            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={52} color="#FFF"/>
            </Link>
        </div>
    );
}