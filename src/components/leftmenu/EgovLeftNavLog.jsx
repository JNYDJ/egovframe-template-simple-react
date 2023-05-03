import React from 'react';

import { NavLink } from 'react-router-dom';
import URL from 'constants/url';

function EgovLeftNavSystem() {
    
    return (
        <div className="nav">
            <div className="inner">
                <h2>시스템관리</h2>
                <ul className="menu4">
                    <li><NavLink to={URL.SYSTEM_COMM} className={({ isActive }) => (isActive ? "cur" : "")}>공통관리</NavLink>
                        <ul className="menu4">
                            <li><NavLink to={URL.SYSTEM_CODE} className={({ isActive }) => (isActive ? "cur" : "")}>공통코드관리</NavLink></li>
                        </ul>
                    </li>
                    <li><NavLink to={URL.SYSTEM_AUTH} className={({ isActive }) => (isActive ? "cur" : "")}>로그관리</NavLink>
                        <ul className="menu4">
                            <li><NavLink to={URL.SYSTEM_TRANLOG} className={({ isActive }) => (isActive ? "cur" : "")}>트랜잭션 로그</NavLink></li>
                            <li><NavLink to={URL.SYSTEM_USERLOG} className={({ isActive }) => (isActive ? "cur" : "")}>사용자별 접속로그</NavLink></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default EgovLeftNavSystem;