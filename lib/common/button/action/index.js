'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react');

var _require$component = require('focus-core').component;

var builder = _require$component.builder;
var types = _require$component.types;

var i18nMixin = require('../../i18n/mixin');
var stylableMixin = require('../../../mixin/stylable');
//const Icon = require('../../icon').component;
var BTN_JS = 'mdl-js-button';
var BTN_CLASS = 'mdl-button';
var BUTTON_PRFX = 'mdl-button--';
var RIPPLE_EFFECT = 'mdl-js-ripple-effect';

var oneOf = React.PropTypes.oneOf;
var materialBehaviour = require('../../mixin/mdl-behaviour');
/**
* Mixin button.
* @type {Object}
*/
var buttonMixin = {
    /** inheritedDoc */
    mixins: [i18nMixin, stylableMixin, materialBehaviour],
    displayName: 'Button',
    /** inheritedDoc */
    getDefaultProps: function getDefaultProps() {
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
    propTypes: {
        id: types('string'),
        label: types('string'),
        handleOnClick: types('function'),
        type: oneOf(['submit', 'button']),
        shape: oneOf([undefined, 'raised', 'fab', 'mini', 'icon', 'mini-fab']),
        color: oneOf([undefined, 'colored', 'primary', 'accent']),
        hasRipple: types('bool'),
        isJs: types('bool'),
        icon: types('string'),
        iconLibrary: oneOf(['material', 'font-awesome', 'focus'])
    },
    /**
    * Handle click event.
    * @return {Object} - Action call.
    */
    handleOnClick: function handleOnClick() {
        var handleOnClick = this.props.handleOnClick;

        if (handleOnClick) {
            return handleOnClick.apply(this, arguments);
        }
    },
    /**
    * Date de composant.
    * @return {string} Classe.
    */
    _className: function _className() {
        var _props = this.props;
        var shape = _props.shape;
        var color = _props.color;
        var hasRipple = _props.hasRipple;
        var isJs = _props.isJs;

        var SHAPE_CLASS = shape ? '' + BUTTON_PRFX + shape : '';
        var COLOR_CLASS = color ? '' + BUTTON_PRFX + color : '';
        var JS_CLASS = isJs ? BTN_JS : '';
        var RIPPLE_EFFECT_CLASS = hasRipple ? RIPPLE_EFFECT : '';
        return BTN_CLASS + ' ' + COLOR_CLASS + ' ' + SHAPE_CLASS + ' ' + JS_CLASS + ' ' + RIPPLE_EFFECT_CLASS;
    },
    /**
    * Render the pressed button.
    * @return {Component} - Component button.
    */
    renderPressedButton: function renderPressedButton() {
        return React.createElement(
            'button',
            null,
            'Loading...'
        );
    },
    /**
    * Render an icon.
    * @return {Component} - Composant icone.
    */
    _renderIcon: function _renderIcon() {
        var _props2 = this.props;
        var icon = _props2.icon;
        var iconLibrary = _props2.iconLibrary;

        switch (iconLibrary) {
            case 'material':
                return React.createElement(
                    'i',
                    { className: 'material-icons' },
                    icon
                );
            case 'font-awesome':
                var faCss = 'fa fa-' + icon;
                return React.createElement('i', { className: faCss });
            default:
                return null;
        }
    },
    /**
    * Render the label.
    * @return {Component} - Tle button label.
    */
    _renderLabel: function _renderLabel() {
        var _props3 = this.props;
        var label = _props3.label;
        var shape = _props3.shape;

        if (label && 'fab' !== shape && 'icon' !== shape && 'mini-fab' !== shape) {
            return this.i18n(label);
        }
        return null;
    },
    /** inheritedDoc */
    render: function render() {
        var _props4 = this.props;
        var id = _props4.id;
        var type = _props4.type;
        var label = _props4.label;
        var style = _props4.style;

        var otherProps = _objectWithoutProperties(_props4, ['id', 'type', 'label', 'style']);

        return React.createElement(
            'button',
            _extends({ alt: this.i18n(label), className: this._className(), 'data-focus': 'button-action', id: id, onClick: this.handleOnClick, style: style, title: this.i18n(label), type: type }, otherProps),
            this._renderIcon(),
            this._renderLabel()
        );
    }
};

module.exports = builder(buttonMixin);