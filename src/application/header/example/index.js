
const Header = FocusComponents.application.header.component;
const HeaderExample =  React.createClass({
    render(){
        return (
            <div>
                <Header>
                    <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title">Title</span>
                    <div className="mdl-layout-spacer"></div>
                        <nav className="mdl-navigation">
                            <a className="mdl-navigation__link" href="">Link</a>
                            <a className="mdl-navigation__link" href="">Link</a>
                            <a className="mdl-navigation__link" href="">Link</a>
                            <a className="mdl-navigation__link" href="">Link</a>
                        </nav>
                    </div>
                </Header>
                <img src="http://lorempixel.com/400/200" />
                <img src="http://lorempixel.com/400/200" />
                <img src="http://lorempixel.com/400/200" />
                <img src="http://lorempixel.com/400/200" />
                <img src="http://lorempixel.com/400/200" />
                <img src="http://lorempixel.com/400/200" />
            </div>
        );
    }
});

return <HeaderExample/>;
