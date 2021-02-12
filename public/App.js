
const cNode = document.getElementById('contents');

function ProductTable(props) {
    const productRows = props.prods.map(prod => React.createElement(ProductRow, {
        key: prod.id, prod: prod }));
    const borderedStyle = { border: "1px solid black", padding: 6 };
    return React.createElement(
        "table",
        { style: { borderCollapse: "collapse" } },
        React.createElement(
            "thead",
            null,
            React.createElement(
                "tr",
                null,
                React.createElement(
                    "th",
                    { style: borderedStyle },
                    "Name"
                ),
                React.createElement(
                    "th",
                    { style: borderedStyle },
                    "Price"
                ),
                React.createElement(
                    "th",
                    { style: borderedStyle },
                    "Category"
                ),
                React.createElement(
                    "th",
                    { style: borderedStyle },
                    "ImageURL"
                )
            )
        ),
        React.createElement(
            "tbody",
            null,
            productRows
        )
    );
}

class ProductAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.productAdd;
        const prod = {
            name: form.name.value, price: form.price.value, category: form.category.value, imageURL: form.imageURL.value
        };
        this.props.createProduct(prod);
        form.name.value = "";
        form.price.value = "$";
        form.category.value = "";
        form.imageURL.value = "";
    }
    render() {
        return React.createElement(
            "form",
            { name: "productAdd", onSubmit: this.handleSubmit },
            React.createElement(
                "section",
                null,
                React.createElement(
                    "h2",
                    null,
                    "Add a new product to inventory"
                ),
                React.createElement(
                    "div",
                    null,
                    "Name",
                    React.createElement("input", { type: "text", name: "name" })
                ),
                React.createElement(
                    "div",
                    null,
                    "Price",
                    React.createElement("input", { type: "text", name: "price", defaultValue: "$" })
                ),
                React.createElement(
                    "div",
                    null,
                    "Category",
                    React.createElement(
                        "select",
                        { id: "list", name: "category" },
                        React.createElement(
                            "option",
                            { value: "Shirts" },
                            "Shirts"
                        ),
                        React.createElement(
                            "option",
                            { value: "Jeans" },
                            "Jeans"
                        ),
                        React.createElement(
                            "option",
                            { value: "Jackets" },
                            "Jackets"
                        ),
                        React.createElement(
                            "option",
                            { value: "Sweaters" },
                            "Sweaters"
                        ),
                        React.createElement(
                            "option",
                            { value: "Accessories" },
                            "Accessories"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    "Image URL",
                    React.createElement("input", { type: "text", name: "imageURL" })
                )
            ),
            React.createElement(
                "section",
                null,
                React.createElement(
                    "button",
                    null,
                    "Add Product"
                )
            )
        );
    }
}
function ProductRow(props) {
    const borderedStyle = { border: "1px solid black", padding: 4 };
    const prod = props.prod;
    return React.createElement(
        "tr",
        null,
        React.createElement(
            "td",
            { style: borderedStyle },
            prod.name
        ),
        React.createElement(
            "td",
            { style: borderedStyle },
            prod.price
        ),
        React.createElement(
            "td",
            { style: borderedStyle },
            prod.category
        ),
        React.createElement(
            "td",
            { style: borderedStyle },
            React.createElement(
                "a",
                { href: prod.imageURL, target: "_blank" },
                "View"
            )
        )
    );
}
class ProductList extends React.Component {
    constructor() {
        super();
        this.state = { prods: [] };
        this.createProduct = this.createProduct.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        setTimeout(() => {
            this.setState({ prods: [] });
        }, 500);
    }
    createProduct(newprod) {
        const newprods = this.state.prods.slice();
        newprod.id = this.state.prods.length + 1;
        newprods.push(newprod);
        this.setState({ prods: newprods });
    }
    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h1",
                null,
                "My Company Inventory"
            ),
            React.createElement(
                "h2",
                null,
                "Showing all available products "
            ),
            React.createElement("hr", null),
            React.createElement(ProductTable, { prods: this.state.prods }),
            React.createElement("hr", null),
            React.createElement(ProductAdd, { createProduct: this.createProduct })
        );
    }
}

ReactDOM.render(React.createElement(ProductList, null), cNode);