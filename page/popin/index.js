var builder = require('focus').component.builder;

/**
 * Popin mixin
 * @type {object}
 */
var popinMixin = {

    /**
     * Display name.
     */
    displayName: 'popin',

    /**
     * Default propos.
     * @returns {object} Default props.
     */
    getDefaultProps: function(){
        return {
            animation: 'right', // right, left, up, down
            type: 'full', // full, centered
            displaySelector: undefined, // Html selector of the element wich open/close the modal when click on it.
            contentLoadingFunction: undefined // Function wich returns the content of the modal.
        };
    },

    /**
     * Initial state.
     * @returns {object} Initial state values
     */
    getInitialState: function(){
        return {
            isDisplayed: false // True if modal is displayed
        };
    },

    _getModalCss: function() {
        var cssClass = 'popin animated float:right;';
        switch (this.props.animation) {
            case 'right':
                cssClass += ' bounceInRight';
                break;
            case 'left':
                cssClass += ' bounceInLeft';
                break;
            case 'down':
                cssClass += ' bounceInDown';
                break;
            case 'up':
                cssClass += ' bounceInUp';
                break;
        }
        return cssClass;
    },
    _getModalContentCss: function() {
        var cssClass = 'modal-content';
        switch (this.props.type) {
            case 'full':
                cssClass += ' full';
                break;
            case 'centered':
                cssClass += ' centered';
                break;
        }
        return cssClass;
    },

    openModal: function openModal() {
        this.setState({isDisplayed: true});
    },
    closeModal: function closeModal() {
        this.setState({isDisplayed: false});
    },

    /**
     * Render the component.
     * @returns {JSX} Htm code.
     */
    render: function renderPopin(){
        var source = document.querySelector(this.props.displaySelector);
        var currentView = this;
        source.onclick = function () {
            currentView.setState({isDisplayed: !currentView.state.isDisplayed});
            /*
            if(currentView.state.isDisplayed) {
                currentView.closeModal();
            } else {
                currentView.openModal();
            }*/
        };

        if(!this.state.isDisplayed) {
            return <div />;
        }

        return (
            <span className={this._getModalCss()}>
                <div className={this._getModalContentCss()}>
                {this.props.contentLoadingFunction()}
                </div>
            </span>
        );
    }
};

module.exports = builder(popinMixin);