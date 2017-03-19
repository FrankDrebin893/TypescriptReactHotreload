import * as React from 'react'
import * as ReactDOM from 'react-dom'

export interface IAppProps {
    greeting:string
};

interface IAppState {
};

class App extends React.Component<IAppProps, IAppState> {

    public render() {
        return (
            <div id="app-container">
                Okay, so it's working now?
            </div>
        );
    }
}

export default App;

ReactDOM.render(
    <App />, document.getElementById('root'));
