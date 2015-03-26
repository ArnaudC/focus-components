var capitalize = require('lodash/string/capitalize');
var assign = require('object-assign');

var storeMixin = {
  /**
   * Get the state informations from the store.
   * @returns {object} - The js object constructed from store data.
   */
  _getStateFromStores: function formGetStateFromStore() {
    if (this.getStateFromStore) {
      return this.getStateFromStore();
    }
    var newState = {};
    this.stores.map((storeConf) => {
      storeConf.properties.map((property)=>{
        newState[property] = storeConf.store[`get${capitalize(property)}`]() ;
      });
    });
    return this._computeEntityFromStoresData(newState);
  },
  /**
   * Compute the data given from the stores.
   * @param {object} data -  The data ordered by store.
   * @returns {object} - The js object transformed from store data.
   */
  _computeEntityFromStoresData: function(data) {
    if(this.computeEntityFromStoresData){
      return this.computeEntityFromStoresData(data);
    }
    var entity = {reference:{}};
    for(var key in data){
      if(this.referenceNames && this.referenceNames.indexOf(key) !== -1){
        entity.reference[key] = data[key];
      }else {
        assign(entity, data[key]);
      }
    }
    return entity;
  },
  /**
   * Register all the listeners related to the page.
   */
  _registerListeners: function() {
    if (this.stores) {
      this.stores.map((storeConf) => {
        storeConf.properties.map((property)=>{
          storeConf.store[`add${capitalize(property)}ChangeListener`](this._onChange);
        });
      });
    }
  },
  /**
  * Unregister all the listeners related to the page.
  */
  _unRegisterListeners: function() {
    if (this.stores) {
      this.stores.map((storeConf) => {
        storeConf.properties.map((property)=>{
          storeConf.store[`remove${capitalize(property)}ChangeListener`]();
        });
      });
    }
  }
};

module.exports = storeMixin;