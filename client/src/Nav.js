import React from "react";
import { Link } from "@reach/router";

function Nav() {
  return (
    <nav className="nav">
      <Link to="/">
        <h1 className="logo">Stackoverflow</h1>
      </Link>
    </nav>
  );
}

export default Nav;
