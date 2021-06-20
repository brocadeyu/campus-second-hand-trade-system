import React from 'react';
import { Map, APILoader,Polyline,} from '@uiw/react-amap';
import ReactDOM from 'react-dom';
import { useState, useRef } from 'react';
import {  ToolBarControl } from '@uiw/react-amap';

const path1 = [ [121.099109,31.222311], [118.528308,31.989555], [117.319812,31.803006], [114.353503,30.67583], [115.891589,28.979429], [112.947253,28.188361], ];
const path2 = [ [116.405289, 39.904987], [113.964458, 40.54664], [111.47836, 41.135964], [108.949297, 41.670904], [106.380111, 42.149509], [103.774185, 42.56996], [101.135432, 42.930601], [98.46826, 43.229964], [95.777529, 43.466798], [93.068486, 43.64009], [90.34669, 43.749086], [87.61792, 43.793308], ];
const ChildComp:any = (props = {}) => {
    return (
        <div>
            <Polyline {...props} visiable={true} strokeOpacity={1} path={path1} />
            <Polyline {...props} visiable={true} strokeOpacity={1} path={path2} />
        </div>
    )
}
const Example = () => {
    const [show, setShow] = useState(true);
    return (
        <div style={{ width: '100%', height: '300px' }}>
            <Map zoom={3}>
                {(props) => {
                    return <ChildComp {...props} />;
                }}
            </Map>
        </div>
    );
}
const Demo = () => (
    <div style={{ width: '100%', height: '300px' }}>
        <APILoader akay="db1e9955747e211f6c1471818a21d5ad">
            <Example />
        </APILoader>
    </div>
);

export default Demo;










