const AutocompleteFor = FocusComponents.common.autocomplete.field.component;

const listLoader = text => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    code: 'RIRI',
                    value: 'Riri'
                },
                {
                    code: 'FIFI',
                    value: 'Fifi'
                },
                {
                    code: 'LOULOU',
                    value: 'Loulou'
                }
            ]);
        }, 500);
    });
};

class AutocompleteSample extends React.Component {
    render() {
        return (
            <div>
                <AutocompleteFor
                    isEdit={true}
                    loader={listLoader}
                />
                <AutocompleteFor
                    isEdit={true}
                    loader={listLoader}
                    value='RIRI'
                />
            </div>
        );
    }
}

return <AutocompleteSample />;
