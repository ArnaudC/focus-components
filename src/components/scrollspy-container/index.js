import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import BackToTop from '../../common/button/back-to-top'
import StickyMenu from './sticky-menu';
import Scroll from '../../behaviours/scroll';
import {filter} from 'lodash/collection';
import {debounce} from 'lodash/function';
import {first, last} from 'lodash/array';
import Grid from '../../common/grid';
import Column from '../../common/column'

const BackToTopComponent = BackToTop.component;

// component default props.
const defaultProps = {
    hasMenu: true, //Activate the presence of the sticky navigation component.
    hasBackToTop: true, //Activate the presence of BackToTop button
    offset: 100, //offset position when affix
    scrollDelay: 10 //defaut debounce delay for scroll spy call
};

// component props definition.
const propTypes = {
    hasMenu: PropTypes.bool,
    hasBackToTop: PropTypes.bool,
    offset: PropTypes.number,
    scrollDelay: PropTypes.number
};

/**
* ScrollspyContainer component.
*/
@Scroll
class ScrollspyContainer extends Component {
    constructor(props) {
        super(props);
        const state = {
            menuList: [],
            affix: false
        };
        this.state = state;
    }

    /** @inheritDoc */
    componentDidMount() {
        this._scrollCarrier = window;
        this._scrollCarrier.addEventListener('scroll', this._debounceRefreshMenu);
        this._scrollCarrier.addEventListener('resize', this._debounceRefreshMenu);
        this._executeRefreshMenu(10);
    }

    /** @inheritDoc */
    componentWillUnmount() {
        this._timeouts.map(clearTimeout);
        this._scrollCarrier.removeEventListener('scroll', this._debounceRefreshMenu);
        this._scrollCarrier.removeEventListener('resize', this._debounceRefreshMenu);
    }

    /**
    * Refresh screen X times.
    * @param  {number} time number of execution
    */
    _executeRefreshMenu = time => {
        this._timeouts = [];
        for (let i = 0; i < time; i++) {
            this._timeouts.push(setTimeout(this._refreshMenu.bind(this), i * 1000));
        }
    }

    _debounceRefreshMenu = () => {
        debounce(this._refreshMenu, this.props.scrollDelay)();
    }

    /**
    * The scroll event handler
    * @private
    */
    _refreshMenu = () => {
        if(!this.props.hasMenu) { return; }
        const {stickyMenu} = this.refs;
        const menus = this._buildMenuList(); //build the menu list
        //TODO remove this check
        const affix = stickyMenu ? this._isMenuAffix() : this.state.affix; //Calculate menu position (affix or not)
        this.setState({
            menuList: menus,
            affix: affix
        });
    }

    /**
    * Build the list of menus.
    * @private
    * @return {array} the list of menus.
    */
    _buildMenuList = () => {
        const {hasMenu} = this.props;
        if(!hasMenu) {
            return [];
        }
        const currentScrollPosition = this.scrollPosition();

        //get menu list$
        const thisReactId = ReactDOM.findDOMNode(this).getAttribute('data-reactid');
        const selectionList = Array.prototype.slice.call(document.querySelectorAll('[data-spy]')).filter(element => {
            let cursorElement = element;
            let isInPopin = false;
            while (cursorElement.getAttribute('data-reactid') !== thisReactId && !isInPopin) {
                cursorElement = cursorElement.parentElement;
                if (cursorElement.getAttribute('data-focus') === 'popin-window') {
                    isInPopin = true;
                }
            }
            return !isInPopin;
        });
        if(selectionList.length === 0) {
            return;
        }
        const menuList = selectionList.map((selection, index) => {
            const title = selection.querySelector('[data-spy-title]');
            const nodeId = selection.getAttribute('data-spy');
            return {
                index: index,
                label: title.innerHTML,
                nodeId: nodeId,
                scrollTop: this.scrollPosition(selection).top, // offset of 10 to be safe
                isActive: false,
                onClick: this._handleMenuItemClick(nodeId)
            };
        });

        const nextTitles = filter(menuList, n => {
            return currentScrollPosition.top < this._getElementRealPosition(n.scrollTop);
        });

        //Calculate current node
        //by default, first node is indexed
        let currentIndex = menuList[0].index;
        if(0 < nextTitles.length) {
            //check the first node
            const firstNode = first(nextTitles);
            const index = firstNode.index;
            if(0 < index) {
                currentIndex = menuList[index - 1].index;
            }
        } else {
            //means that the position is the last title
            currentIndex = last(menuList).index;
        }
        menuList[currentIndex].isActive = true;
        return menuList;
    }

    /**
    * Calculate the real position of an element, depending on declared offset in props.
    * @private
    * @param  {number} position position
    * @return {number} the real position
    */
    _getElementRealPosition = (position) => {
        const sscDomNode = ReactDOM.findDOMNode(this);
        const sscPosition = this.scrollPosition(sscDomNode);
        return position - sscPosition.top;
    }

    /**
    * Calculate menu position (affix or not)
    * @private
    * @return {Boolean} true is menu must be affix, else false
    */
    _isMenuAffix = () => {
        let {offset} = this.props;
        const {hasMenu} = this.props;
        if(!hasMenu) {
            return false;
        }
        const sscDomNode = ReactDOM.findDOMNode(this);
        const currentViewPosition = sscDomNode.getBoundingClientRect();
        const containerPaddingTop = this._getPaddingTopValue();
        offset -= containerPaddingTop;
        return currentViewPosition.top <= offset;
    }

    _getPaddingTopValue = () => {
        const sscDomNode = ReactDOM.findDOMNode(this);
        const computedStyles = window.getComputedStyle(sscDomNode, null);
        const paddingTop = computedStyles.getPropertyValue('padding-top');
        return paddingTop ? parseInt(paddingTop, 0) : 0;
    }

    /**
    * Handle click on item menu function.
    * @private
    * @param  {string} menuId  node spyId in DOM to scroll to
    * @return {function}        function to call
    */
    _handleMenuItemClick(menuId) {
        return () => {
            this._onMenuItemClick(menuId);
        }
    }

    /**
    * Menu click function. Scroll to the node position.
    * @private
    * @param  {string} menuId  node spyId in DOM to scroll to
    */
    _onMenuItemClick(menuId) {
        const selector = `[data-spy='${menuId}']`;
        const node = document.querySelector(selector);
        const nodePosition = this.scrollPosition(node);
        const positionTop = this._getElementRealPosition(nodePosition.top);
        this.scrollTo(undefined, positionTop);
    }

    /** @inheritedDoc */
    render() {
        const {children, gridMenuSize, hasMenu, hasBackToTop, offset, ...otherProps} = this.props;
        const {affix, menuList} = this.state;
        let {gridContentSize} = this.props;
        gridContentSize = hasMenu ? gridContentSize : 12;
        return (
            <div data-focus='scrollspy-container' {...otherProps}>
                {hasMenu &&
                    <StickyMenu affix={affix} affixOffset={offset} menuList={menuList} ref="stickyMenu" />
                }
                <div data-focus='scrollspy-container-content'>
                    {children}
                </div>
                {hasBackToTop &&
                    <BackToTopComponent />
                }
            </div>
        );
    }
}

//Static props.
ScrollspyContainer.displayName = 'ScrollspyContainer';
ScrollspyContainer.defaultProps = defaultProps;
ScrollspyContainer.propTypes = propTypes;

export default ScrollspyContainer;
