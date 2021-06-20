import { message ,Spin} from 'antd';
import React, {FC, useEffect, useState} from 'react';
import {Route, Switch, BrowserRouter, RouteComponentProps} from 'react-router-dom';
import Index from './views/Index';
import Todo from './views/Todo';
import Detail from './views/Detail'
import Map from './views/Map/index'
import Home from './views/Home'
import Mygood from "./views/Mygood";
import MyBuy from "./views/Mybuy";
import MySell from "./views/MySell";
import MyCenter from "./views/MyCenter";



// 配置全局 message
message.config({
  duration: 1,
  maxCount: 3,
});




// const App: FC<IAppProps> = ({
//
//
//                               }) => {
//   const [loading, setLoading] = useState(true);
//

  // useEffect(() => {
  // },);
  //
  //
  // const loadingShow =()=> {
  //   setLoading(false);
  //
  //      setTimeout( ()=>setLoading( false ), 1000)
  //
  //
  // }
//
//


const App = () =>
 (
      <React.Fragment>
        <BrowserRouter>
          {/*<Spin tip="Loading..." spinning={true} size="large">*/}
            <Switch>
              <Route path="/login" component={Index} exact={true}/>
              <Route path="/todo" component={Todo}/>
              <Route path="/home" component={Home}/>
              <Route path="/Detail" component={Detail}/>
              <Route path="/Map" component={Map}/>
              <Route path="/Mygood" component={Mygood}/>
              <Route path="/MyBuy" component={MyBuy}/>
              <Route path="/MySell" component={MySell}/>
              <Route path="/MyCenter" component={MyCenter}/>
            </Switch>
          {/*</Spin>*/}
        </BrowserRouter>
      </React.Fragment>
  );


export default App;
