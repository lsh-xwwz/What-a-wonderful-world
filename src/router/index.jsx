import React, { Component } from 'react';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
/* 
    //  https://blog.csdn.net/qq_43392573/article/details/121658373
    Router 作为路由的总容器，承载整个路由的管理
    Route 管理每一个子路由，包含组件和访问路径
    Routes 匹配规则，同时只匹配一个
*/
import App from '../pages/App'
import SignUpPage from '../pages/SignUp'
import SignInPage from '../pages/SignIn';

import HeaderNav from '../components/HeaderNav';

export default class index extends Component{
    render(){
        return (
            <Router>
                <HeaderNav/>
                <Routes>
                    <Route exact path="/" element={<App />} />
                    <Route path="/signUp" element={<SignUpPage />} />
                    <Route path="/signIn" element={<SignInPage />} />
                </Routes>
            </Router>
        )
    }

}
