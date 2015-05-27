## Technical Configuration
Mixin permettant d'impl�menter un panneau de recherche avanc�e.

## Attributs
<table>
    <thead>
		<tr>
          <th>Attribut</th>
          <th>Options</th>
          <th>valeurs possibles</th>
          <th>valeur par d�fault</th>
          <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>criteria</code></td>
            <td><i>object</i></td>
            <td><code>{scope: "Scope", searchText: "value"}</code></td>
            <td></td>
            <td>D�finit le crit�re de recherche saisi dans la recherche rapide.</td>
        </tr>
        <tr>
            <td><code>lineMap</code></td>
            <td><i>object</i></td>
            <td><code>{scope1: line}</code></td>
            <td><code>text</code></td>
            <td>D�finit la map des diff�rents type de ligne � afficher dans r�sultats de recherche.</td>
        </tr>
        <tr>
            <td><code>operationList</code></td>
            <td><i>array</i></td>
            <td></td>
            <td><code>[]</code></td>
            <td>D�finit la liste des op�rations applicable sur un groupe de lignes.</td>
        </tr>
         <tr>
            <td><code>lineOperationList</code></td>
            <td><i>array</i></td>
            <td></td>
            <td><code>[]</code></td>
            <td>D�finit la liste des op�rations applicable sur une ligne.</td>
        </tr>
        <tr>
            <td><code>facetConfig</code></td>
            <td><i>object</i></td>
            <td><code>{FCT_PAYS: "text", FCT_STATUS: "text"}</code></td>
            <td><code>{}</code></td>
            <td>D�finit la liste des facettes disponible pour la recherche avanc�e.</td>
        </tr>
        <tr>
            <td><code>orderableColumnList</code></td>
            <td><i>array</i></td>
            <td><code>[{key:"col1", order:"desc", label:"Colonne 1 desc"}]</code></td>
            <td><code>{}</code></td>
            <td>D�finit la liste des colonnes triables.</td>
        </tr>
        <tr>
            <td><code>groupMaxRows</code></td>
            <td><i>number</i></td>
            <td></td>
            <td><code>3</code></td>
            <td>D�finit le nombre de ligne � afficher par groupe pour un grouby sur une colonne.</td>
        </tr>
        <tr>
            <td><code>idField</code></td>
            <td><i>string</i></td>
            <td></td>
            <td>id</td>
            <td>D�finit le nom de l'attribut portant l'id sur une ligne.</td>
        </tr>
        <tr>
            <td><code>isSelection</code></td>
            <td><i>boolean</i></td>
            <td></td>
            <td><code>true</code></td>
            <td>D�finit si la liste offre la possibilit� de s�lectionner les lignes de r�sultat.</td>
        </tr>
        <tr>
            <td><code>onLineClick</code></td>
            <td><i>function</i></td>
            <td></td>
            <td>aucune.</td>
            <td>D�finit la fonction � ex�cuter lors du clic sur une ligne de r�sultat.</td>
        </tr>
        <tr>
            <td><code>unselectedScopeAction</code></td>
            <td><i>function</i></td>
            <td></td>
            <td>aucune.</td>
            <td>D�finit la fonction � ex�cuter lors du clic sur la suppression du scope de la recherche avanc�e.</td>
        </tr>
        <tr>
            <td><code>exportAction</code></td>
            <td><i>function</i></td>
            <td></td>
            <td>aucune.</td>
            <td>D�finit la fonction � ex�cuter lors du clic sur le bouton exporter.</td>
        </tr>
   </tbody>
</table>

## M�thodes
<table>
    <thead>
        <tr>
            <th>M�thode</th>
            <th>Param�tres</th>
            <th>Retour</th>
            <th>Description</th>
        </tr>
    </thead>
        <tbody>
            <tr>
                <td><code>liveFilterComponent()</code></td>
                <td>Aucun.</td>
                <td><i>React-component</i></td>
                <td>Retourne le composant filtre par facettes.</td>
            </tr>
            <tr>
                <td><code>isSimpleList()</code></td>
                <td>Aucun.</td>
                <td><i>boolean</i></td>
                <td>Retourne true si le resultat de la recherche est une liste simple et non une liste group�e.</td>
            </tr>
            <tr>
                <td><code>simpleListComponent()</code></td>
                <td>Aucun.</td>
                <td><i>React-component</i></td>
                <td>Retourne une liste de r�sultats simple. Doit �tre utilis�e lorsque la recherche est effectu�e sur un scope.</td>
            </tr>
            <tr>
                <td><code>groupByListComponent()</code></td>
                <td>Aucun.</td>
                <td><i>React-component</i></td>
                <td>Retourne le composant de liste de r�sultats en mode group�.Doit �tre utilis� dans le cas d'une recherche globale.</td>
            </tr>
            <tr>
                <td><code>listSummaryComponent()</code></td>
                <td>Aucun.</td>
                <td><i>React-component</i></td>
                <td>Retourne le composant de liste de r�sultats en mode group�.Doit �tre utilis� dans le cas d'une recherche globale.</td>
            </tr>
            <tr>
                <td><code>actionBarComponent()</code></td>
                <td>Aucun.</td>
                <td><i>React-component</i></td>
                <td>Retourne le composant de barre d'action applicable � la liste.</td>
            </tr>
    </tbody>
</table>

## Ev�nements
Ev�nement � d�finir par l'utilisateur.

<table>
	<thead>
		<tr>
          <th>Ev�nement</th>
          <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
          <td><code>`line:onClick`</code></td>
          <td>action sur le click d'une ligne.</td>
      </tr>
   </tbody>
</table>

## Utilisation du mixin de recherche-r�sultats
afin d'uitliser le mixin il est n�cessaire de d�finir deux attributs et deux m�thodes :
- attributs : actions et store
- m�thodes : render et renderGroupByBlock

```javascript
 React.createClass({
     mixins:[FocusComponents.page.search.filterResult.mixin],
     actions: action,
     store: {[store de recherche]},
     render: function render() {
         var list = this.isSimpleList() ? this.simpleListComponent({type:"test"}) : this.groupByListComponent();
         var root = React.createElement('div', { className: "search-result" },
                 this.liveFilterComponent(),
                 React.createElement(
                         "div",
                         { className: "resultContainer" },
                         this.listSummaryComponent(),
                         this.actionBarComponent(),
                         list
                 )
         );
         return root;
     },
     renderGroupByBlock: function renderGroupByBlock(groupKey, list, maxRows) {
         return React.createElement( "div", { className: "listResultContainer panel" },
                     React.createElement(FocusComponents.common.title.component, { title: groupKey }),
                     this.simpleListComponent({
                         type: "test",
                         list: list,
                         maxRows: maxRows
                     }),
                     React.createElement(FocusComponents.common.button.action.component, { handleOnClick: this.changeGroupByMaxRows(groupKey, 5), label: "Show more" }),
                     React.createElement(FocusComponents.common.button.action.component, { handleOnClick: this.showAllGroupListHandler(groupKey), label: "Show all" })
         );

     }
 })
```

## D�pendances � impl�menter
- la structure du r�pertoire de d�veloppement doit �tre la suivante :

```javascript
_actions
    _search
        index.js
_searchResult
    * line1.jsx
    * line2.jsx
    * preview1.jsx
    * preview2.jsx
    * searchResult.jsx
```

- la recherche n�cessite �galement la cr�ation d'un store de type **Focus.store.SearchStore**
- les lignes doivent impl�menter le mixin de ligne **Focus.components.list.selection.line.mixin**

## Structure
- un champs de recherche
- une liste de r�sultat

## Exemple
[Exemple de recherche-r�sultat](https://github.com/KleeGroup/focus-components/blob/master/page/search/search-result/example/index.html)
## Test
todo
## D�mo
[D�mo de recherche-r�sultat](http://kleegroup.github.io/focus-components/page/search/search-result/example/)