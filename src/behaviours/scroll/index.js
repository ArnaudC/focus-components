import {isUndefined} from 'lodash/lang';

const Scroll = Component => class ScrollComponent extends Component {
    constructor(props) {
        super(props);
    }

    /**
    * Get the scroll position from the top of the screen.
    *
    * https://developer.mozilla.org/fr/docs/Web/API/Element/getBoundingClientRect
    *
    * @param {object} domNode domNoe to get the position from
    * @returns {int} - The position in pixel from the top of the scroll container.
    */
    scrollPosition(domNode) {
        const y = window.pageYOffset || document.documentElement.scrollTop;
        const x = window.pageXOffset || document.documentElement.scrollLeft;
        if(isUndefined(domNode)) {
            return { top: y, left: x };
        }
        const nodeRect = domNode.getBoundingClientRect();
        return { left: nodeRect.left + x, top: nodeRect.top + y };
    }


    /**
    * Set scrollbar position with smooth animation.
    * http://www.w3schools.com/jsref/prop_win_pagexoffset.asp
    *
    * @param {object} element  element parent for the scroll
    * @param {number} to       position of the scroll
    * @param {number} duration duration of animation
    */
    scrollTo(element, to, duration = 500) {
        if(isUndefined(element)) {
            window.scrollTo(0, to);
            return;
        }
        element.scrollTop = to;
    }

};

export default Scroll;
