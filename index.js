class CheckList extends React.Component {

    constructor(props) {
        super(props)
        var storedItems = JSON.parse(window.localStorage.getItem("items"))
        this.state = {
            list: storedItems ? storedItems : []
        }
    }

    saveItems = (obj) => {
        window.localStorage.setItem("items", JSON.stringify(obj ? obj : this.state.list))
    }

    deleteItem = (id) => {
        var copy = [...this.state.list]
        copy.splice(id, 1)
        this.setState({ list: copy })
        this.saveItems(copy)
    }

    updateContent = (id) => {
        var copy = [...this.state.list]
        var content = document.querySelector("input[id='" + id + "']").value
        copy[id].content = content
        this.setState({ list: copy })
        this.saveItems(copy)
    }

    toggleItem = (id) => {
        var copy = [...this.state.list]
        copy[id].checked = !copy[id].checked
        this.setState({ list: copy })
        this.saveItems(copy)
    }

    addItem = () => {
        var newList = [...this.state.list, { checked: false, content: "", key: uuidv4() }]
        this.setState({ list: newList })
        this.saveItems(newList)
    }

    render() {
        return (
            React.createElement("div", {},
                this.state.list.map((item, i) => {
                    return React.createElement(ChecklistItem, { key: item.key, index: i, item: item, toggleItem: this.toggleItem, updateContent: this.updateContent, deleteItem: this.deleteItem })
                }),
                React.createElement("button", { className: "add-item", onClick: this.addItem }, "add")
            )
        )
    }
}

function ChecklistItem({ item, index, toggleItem, updateContent, deleteItem }) {
    function handleClick() {
        toggleItem(index)
    }

    function handleTextInput() {
        updateContent(index)
    }

    function deleteSelf() {
        deleteItem(index)
    }

    return React.createElement("div", { className: "checklist-div" },
        React.createElement("input", { type: "checkbox", className: "checkbox", defaultChecked: item.checked, onClick: () => { handleClick() } }),
        React.createElement("input", { type: "text", className: "text-input", value: item.content, id: index, onChange: () => { handleTextInput() } }),
        React.createElement("button", { className: "button-outline", onClick: () => { deleteSelf() } }, "remove")
    )
}

const domContainer = document.querySelector('#container');
ReactDOM.render(React.createElement(CheckList), domContainer);