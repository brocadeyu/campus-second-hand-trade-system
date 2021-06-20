import React from 'react';
import ReactDOM from 'react-dom';
import { Map, Marker } from 'react-amap';


class Amap extends React.Component {

    render() {
        return (
            <>
                <div style={{ width: '100%', height: '1000px', position: 'relative' }}>
                    <Map events={this.amapEvents} amapkey={'db1e9955747e211f6c1471818a21d5ad'}>
                        <Marker position={this.markerPosition} events={this.markerEvents} />
                    </Map>
                </div>
            </>
        )
    }
}

export default Amap
