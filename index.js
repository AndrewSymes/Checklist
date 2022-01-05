'use strict';

class ChecklistItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            content: ""
        }
    }
    render() {
        return React.createElement('div', { className: "check" },
            React.createElement(
                'button', {
                    onClick: () => this.setState({ checked: !this.state.checked }),
                    className: this.state.checked ? "checked" : "unchecked"
                }),
            React.createElement('input', { placeholder: "hi" })
        )
    }
}

class Checklist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            count: 0
        }
    }

    addItem = () => {
        this.setState({
            items: [...this.state.items, React.createElement(ChecklistItem, { key: this.state.count }, null)]
        })
        this.state.count += 1
    }

    render() {
        return React.createElement('div', { className: "checklist" },
            this.state.items,
            React.createElement('button', { onClick: this.addItem }, 'New Item')
        )
    }
}

const domContainer = document.querySelector('#container');
ReactDOM.render(React.createElement(Checklist), domContainer);