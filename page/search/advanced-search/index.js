// Dependencies

let builder = require('focus').component.builder;
let React = require('react');
let assign = require('object-assign');

// Components

let FacetBox = require('../../../search/facet-box').component;
let ListActionBar = require('../../../list/action-bar/index').component;
let ListSummary = require('../../../list/summary/index').component;

// Store

let SearchStore = require('focus').store.SearchStore;

// Mixins

let ScrollInfoMixin = require('../common/scroll-info-mixin').mixin;
let GroupByMixin = require('../common/group-by-mixin').mixin;
let SearchMixin = require('../common/search-mixin').mixin;

let AdvancedSearchMixin = {
    mixins: [ScrollInfoMixin, GroupByMixin, SearchMixin],
    /**
     * Display name.
     */
    displayName: 'advanced-search',
    /**
     * Component initialisation
     */
    componentDidMount() {
        this._registerListeners();
        this.search();
    },
    /**
     * Actions before component will unmount.
     * @constructor
     */
    componentWillUnmount() {
        this._unRegisterListeners();
    },
    /**
     * Init default props.
     * @returns {object} Default props.
     */
    getDefaultProps() {
        return {
            facetConfig: {},
            idField: 'id',
            isSelection: true,
            criteria: {
                scope: undefined,
                searchText: undefined
            },
            exportAction: function () {
            },
            unselectedScopeAction: function () {
            }
        };
    },
    /**
     * Init default state.
     * @returns {object} Initialized state.
     */
    getInitialState() {
        return assign({
            facetList: {},
            selectedFacetList: {},
            openedFacetList: this.props.openedFacetList,
            selectionStatus: 'none',
            orderSelected: undefined,
            groupSelectedKey: undefined
        });
    },
    /**
     * Get the state from store.
     * @returns {object} Dtat to update store.
     */
    _getStateFromStore() {
        if (this.store) {
            let data = this.store.get();
            return assign({
                facetList: data.facet
            }, this.getScrollState());
        }
    },

    /**
     * Register a listener on the store.
     * @private
     */
    _registerListeners() {
        if (this.store) {
            this.store.addSearchChangeListener(this._onSearchChange);
        }
    },
    /**
     * Unregister a listener on the store.
     * @private
     */
    _unRegisterListeners() {
        if (this.store) {
            this.store.removeSearchChangeListener(this._onSearchChange);
        }
    },

    /**
     * Handler when store emit a change event.
     */
    _onSearchChange() {
        this.setState(this._getStateFromStore());
    },
    /**
     * Get the list of facet to print into the top bar.
     * @returns {{}} Facets object : [facet1: 'Label of facet1', facet2: 'Label of facet2'}.
     * @private
     */
    _getFacetListForBar() {
        let facetList = {};
        for (let key in this.state.selectedFacetList) {
            let facet = this.state.selectedFacetList[key];
            facetList[key] = facet.data.label;
        }
        return facetList;
    },
    /**
     * Click on bar facet action handler.
     * @param key [string}  Key of the clicked facet.
     * @private
     */
    _facetBarClick(key) {
        let selectedFacetList = this.state.selectedFacetList;
        delete selectedFacetList[key];

        this.state.selectedFacetList = selectedFacetList;
        this.setState(
            assign(
                {selectedFacetList: selectedFacetList},
                this.getNoFetchState())
            , this.search);
    },
    /**
     * Group action click handler.
     * @param {string} key Name of the column to group (if null => ungroup action).
     * @private
     */
    _groupClick(key) {
        console.log('Group by : ' + key);
        this.setState(
            assign(
                {groupSelectedKey: key},
                this.getNoFetchState()
            ), this.search);
    },
    /**
     * Order action click handler.
     * @param {string} key Column to order.
     * @param {string} order Order  asc/desc
     * @private
     */
    _orderClick(key, order) {
        console.log('Order : ' + key + ' - ' + order);
        this.setState(
            assign(
                {orderSelected: {key: key, order: order}},
                this.getNoFetchState()
            ), this.search);
    },
    /**
     * Selection action handler.
     * @param selectionStatus Current selection status.
     * @private
     */
    _selectionGroupLineClick(selectionStatus) {
        console.log('Selection status : ' + selectionStatus);
        this.setState({
            selectionStatus
        });
    },
    /**
     * Handler called when facet is selected.
     * @param facetComponentData Data of facet.
     */
    _facetSelectionClick(facetComponentData, isDisableGroup) {
        console.warn('Facet selection ');
        console.log(facetComponentData.selectedFacetList);

        let newState = {
            selectedFacetList: facetComponentData.selectedFacetList,
            openedFacetList: facetComponentData.openedFacetList
        };
        if (isDisableGroup) {
            newState.groupSelectedKey = undefined;
        }

        this.setState(assign(newState, this.getNoFetchState()), this.search);
    },
    /**
     * Line selection handler.
     * @param item Line checked/unchecked.
     */
    _selectItem(item) {
        this.setState({selectionStatus: 'partial'});
    },
    /**
     * Export action handler.
     */
    _exportHandler() {
        this.props.exportAction();
    },
    /**
     * Click on scope action handler.
     */
    _scopeClick() {
        this.props.unselectedScopeAction();
    },
    /**
     * Action on line click.
     * @param {object} item  the item clicked
     */
    _lineClick(item) {
        if (this.props.onLineClick) {
            this.props.onLineClick(item);
        }
    },
    /**
     * Render the show all button  seect the group corresponding facet.
     * @param groupKey Group key.
     * @returns {Function} Function to select the facet.
     */
    showAllGroupListHandler(groupKey) {
        return (event)=> {
            let selectedFacetList = this.state.selectedFacetList;

            let facet = this.store.getFacet();
            selectedFacetList[this.state.groupSelectedKey] = {
                data: facet[this.state.groupSelectedKey][groupKey],
                key: groupKey
            };
            this._facetSelectionClick({
                selectedFacetList: selectedFacetList,
                facetComponentData: this.state.openedFacetList
            }, true);
        };
    },

    /**
     * Render the facet box.
     * @returns {XML} Render the facetBox.
     */
    getFacetBoxComponent() {
        return (
            <div className='facetBoxContainer'>
                <FacetBox
                    facetList={this.state.facetList}
                    selectedFacetList={this.state.selectedFacetList}
                    openedFacetList={this.state.openedFacetList}
                    config={this.props.facetConfig}
                    dataSelectionHandler={this._facetSelectionClick}/>
            </div>
        );
    },
    /**
     * Render the list summary component.
     * @returns {XML} Htm code.
     */
    getListSummaryComponent() {
        let scopeList = {scope: this.props.criteria.scope};
        return (
            <div className='listSummaryContainer panel'>
                <ListSummary
                    nb={this.state.totalRecords}
                    queryText={this.props.criteria.searchText}
                    scopeList={scopeList}
                    scopeClickAction={this._scopeClick}
                    exportAction={this._exportHandler}/>
            </div>
        );
    },
    /**
     * Render the action bar.
     * @returns {XML} Rendering of the action bar.
     */
    getActionBarComponent() {
        let groupableColumnList = Object.keys(this.state.facetList).reduce((result, facetKey) => {
            result[facetKey] = facetKey;
            return result;
        }, {});
        return (
            <div className='listActionBarContainer panel'>
                <ListActionBar selectionStatus={this.state.selectionStatus}
                               selectionAction={this._selectionGroupLineClick}
                               orderableColumnList={this.props.orderableColumnList}
                               orderAction={this._orderClick}
                               orderSelected={this.state.orderSelected}
                               groupableColumnList={groupableColumnList}
                               groupAction={this._groupClick}
                               groupSelectedKey={this.state.groupSelectedKey}
                               facetList={this._getFacetListForBar()}
                               facetClickAction={this._facetBarClick}
                               operationList={this.props.lineOperationList}/>
            </div>
        );
    }
};

module.exports = builder(AdvancedSearchMixin, true);