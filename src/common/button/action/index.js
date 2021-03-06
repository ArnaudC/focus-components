const React = require('react');
const {builder, types} = require('focus-core').component;
const i18nMixin = require('../../i18n/mixin');
const stylableMixin = require('../../../mixin/stylable');
//const Icon = require('../../icon').component;
const BTN_JS = 'mdl-js-button';
const BTN_CLASS = 'mdl-button';
const BUTTON_PRFX = 'mdl-button--';
const RIPPLE_EFFECT = 'mdl-js-ripple-effect';

const PropTypes = React.PropTypes;
const materialBehaviour = require('../../mixin/mdl-behaviour');

const propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    handleOnClick: PropTypes.func,
    type: PropTypes.oneOf(['submit', 'button']),
    shape: PropTypes.oneOf([undefined, 'raised', 'fab', 'icon', 'mini-fab']),
    color: PropTypes.oneOf([undefined, 'colored', 'primary', 'accent']),
    hasRipple: PropTypes.bool,
    isJs: PropTypes.bool,
    icon: PropTypes.string,
    iconLibrary: PropTypes.oneOf(['material', 'font-awesome', 'font-custom'])
};

/**
* Mixin button.
* @type {Object}
*/
const buttonMixin = {
    /** inheritedDoc */
    mixins: [i18nMixin, stylableMixin, materialBehaviour],
    displayName: 'Button',
    /** inheritedDoc */
    getDefaultProps() {
        return {
            type: 'submit',
            shape: 'raised',
            label: '',
            icon: '',
            id: '',
            hasRipple: false,
            isJs: false,
            iconLibrary: 'material'
        };
    },
    propTypes: propTypes,
    /**
    * Handle click event.
    * @return {Object} - Action call.
    */
    handleOnClick() {
        const {handleOnClick} = this.props;
        if (handleOnClick) {
            return handleOnClick.apply(this, arguments);
        }
    },
    /**
    * Date de composant.
    * @return {string} Classe.
    */
    _getComponentClassName() {
        const {shape, color, hasRipple, isJs} = this.props;
        let SHAPE_CLASS;
        switch (shape) {
            case 'raised':
            SHAPE_CLASS = `${BUTTON_PRFX}raised`;
            break;
            case 'fab':
            SHAPE_CLASS = `${BUTTON_PRFX}fab`;
            break;
            case 'icon':
            SHAPE_CLASS = `${BUTTON_PRFX}icon`;
            break;
            case 'mini-fab':
            SHAPE_CLASS = `${BUTTON_PRFX}mini-fab ${BUTTON_PRFX}fab`;
            break;
            default:
            SHAPE_CLASS = null;
            break;
        }
        const COLOR_CLASS = color ? `${BUTTON_PRFX}${color}` : '';
        const JS_CLASS = isJs ? BTN_JS : '';
        const RIPPLE_EFFECT_CLASS = hasRipple ? RIPPLE_EFFECT : '';
        return `${BTN_CLASS} ${COLOR_CLASS} ${SHAPE_CLASS} ${JS_CLASS} ${RIPPLE_EFFECT_CLASS}`;
    },
    /**
    * Render the pressed button.
    * @return {Component} - Component button.
    */
    renderPressedButton () {
        return (<button>Loading...</button>);
    },
    /**
    * Render an icon.
    * @return {Component} - Composant icone.
    */
    _renderIcon() {
        const {icon, iconLibrary} = this.props;
        switch (iconLibrary) {
            case 'material':
            return <i className='material-icons'>{icon}</i>;
            case 'font-awesome':
            const faCss = `fa fa-${icon}`;
            return <i className={faCss}></i>;
            case 'font-custom':
            return <span className={`icon-${icon}`}></span>;
            default:
            return null;
        }
    },
    /**
    * Render the label.
    * @return {Component} - Tle button label.
    */
    _renderLabel () {
        const {label, shape} = this.props;
        if (label && 'fab' !== shape && 'icon' !== shape && 'mini-fab' !== shape ) {
            return this.i18n(label);
        }
        return null;
    },
    /** inheritedDoc */
    render() {
        const {className, id, type, label, style, ...otherProps} = this.props;
        return (
            <button alt={this.i18n(label)} className={`${className} ${this._getComponentClassName()}`} data-focus='button-action' id={id} onClick={this.handleOnClick} title={this.i18n(label)} type={type} {...otherProps}>
                {this._renderIcon()}
                {this._renderLabel()}
            </button>
        );
    }
}
;

module.exports = builder(buttonMixin);
