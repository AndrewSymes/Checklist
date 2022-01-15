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

    updateContent = (e, id) => {
        var copy = [...this.state.list]
        var content = e.target.value
        copy[id].content = content
        copy[id].height = e.target.value != "" ? (e.target.scrollHeight) + "px" : "0px"
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
        var newList = [...this.state.list, {
            checked: false,
            content: "",
            key: uuidv4(),
            height: ""
        }]
        this.setState({ list: newList })
        this.saveItems(newList)
    }

    render() {
        return (
            React.createElement("div", { className: "checklist" },
                this.state.list.map((item, i) => {
                    return React.createElement(ChecklistItem, {
                        item: item,
                        key: item.key,
                        index: i,
                        toggleItem: this.toggleItem,
                        updateContent: this.updateContent,
                        deleteItem: this.deleteItem
                    })
                }),
                React.createElement("button", {
                        className: "add-item",
                        onClick: this.addItem
                    },
                    "add")
            )
        )
    }
}

function ChecklistItem(props) {
    function handleClick() {
        props.toggleItem(props.index)
    }

    function handleTextInput(e) {
        props.updateContent(e, props.index)
    }

    function deleteSelf() {
        props.deleteItem(props.index)
    }

    return React.createElement("div", { className: "checklist-item" },
        React.createElement("input", {
            type: "checkbox",
            className: "checkbox",
            defaultChecked: props.item.checked,
            onClick: () => { handleClick() }
        }),
        React.createElement("textarea", {
            style: { height: props.item.height },
            value: props.item.content,
            rows: 1,
            className: "text-input",
            id: props.index,
            onInput: (e) => { handleTextInput(e) }
        }),
        React.createElement("button", {
                className: "button-outline",
                onClick: () => { deleteSelf() }
            },
            "remove")
    )
}

const domContainer = document.querySelector('#container');
ReactDOM.render(React.createElement(CheckList), domContainer);