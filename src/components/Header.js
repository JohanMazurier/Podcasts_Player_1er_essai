import React from 'react'

const Header = () => {
    return (
        <header className="site-navbar py-4" role="banner">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-3">
                        <h1 className="site-logo"><a href="/" className="h1">FlowCast<span className="text-primary">.</span> </a></h1>
                    </div>
                    <div className="col-9">
                        <nav className="site-navigation position-relative text-right text-md-right" role="navigation">
                            <div className="d-block d-lg-none ml-md-0 mr-auto">
                                <a href="#" className="site-menu-toggle js-menu-toggle text-black">
                                    <span className="icon-menu h3"></span>
                                </a>
                            </div>

                            <ul className="h2 site-menu js-clone-nav d-none d-lg-block">
                                <li className="active">
                                    <a href="/">Accueil</a>
                                </li>
                                <li><a href="about.html">A propos</a></li>
                                <li><a href="contact.html">Nous Contacter</a></li>
                                <li><a href="login-register.html">Se connecter / S'enregistrer</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>

    )
}

export default Header