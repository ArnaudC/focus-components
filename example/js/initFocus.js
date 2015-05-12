var domain =  {
  "DO_TEXT": {
    style: "do_text",
    type: "text",
    component: "PapaSinge",
    validation: [{
      type: "function",
      value: function() {
        return false;
      }
    }]
  },
  "DO_EMAIL": {
    style: "do_email",
    type: "email",
    component: "PapaMail",
    validation: [{
      type: "function",
      value: function() {
        return true;
      }
    }]
  },
  'DO_DATE': {
    'InputComponent': FocusComponents.common.input.date.component,
    'formatter': function(date){
      var monthNames = [
      'January', "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
        ];
        date = new Date(date);
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        return "" + day +" "+ monthNames[monthIndex] +" "+ year;
    }

  }
};
Focus.definition.domain.container.setAll(domain);
/*global focus*/
var entities ={
  "contact": {
    "firstName": {
      "domain": "DO_TEXT",
      "required": false,
      "validator": function(data){
        return data.length <= 3 ? "le champ doit dépasser la taille de 3" : true;
      }
    },
    "lastName": {
      "domain": "DO_TEXT",
      "required": true
    },
    "age": {
      "domain": "DO_NUMBER",
      "required": false,
      "type": "number"
    },
    "email": {
      "domain": "DO_EMAIL",
      "required": false
    },
    "bio": {
      "domain": "DO_EMAIL",
      "InputComponent": FocusComponents.common.input.textarea.component
    },
    "isCool":{
      "domain": "DO_BOOLEAN",
      "FieldComponent": FocusComponents.common.input.checkbox.component
    },
    "isNice":{
      "domain": "DO_BOOLEAN",
      "FieldComponent": FocusComponents.common.input.toggle.component
    },
    "birthDate":{
      "domain": "DO_DATE",
    }
  }};
Focus.definition.entity.container.setEntityConfiguration(entities);

function loadRedList(name){
    return function loadRef(){
      var refLst = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function(cd){
        return {
          code: cd,
          label: ('' + cd + ' ' + name)
        };
      });
    return Promise.resolve(refLst);
  };
}

  Focus.reference.config.set({'papas': loadRedList('papas'), 'singe': loadRedList('singe')});
  Focus.definition.entity.container.setEntityConfiguration(entities);
