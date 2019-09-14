import React from "react";
import { Navbar, NavItem } from "react-materialize";
import logo from "../assets/logo-arkademy.png";

const NavbarPage = () => {
    return (
        <div className="nav-wrapper">
            <Navbar
                brand={
                    <div>
                        <img
                            src={logo}
                            style={{
                                width: "100px",
                                height: "75px",
                                margin: "0 10px"
                            }}
                            alt="logo"
                        />
                    </div>
                }
                alignLinks="left"
            >
                <NavItem>
                    <h5 style={{ marginLeft: "100px" }}>ARKADEMY BOOTCAMP</h5>
                </NavItem>
            </Navbar>
        </div>
    );
};

export default NavbarPage;
