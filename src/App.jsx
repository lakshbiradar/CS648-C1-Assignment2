
const cNode = document.getElementById('contents');

function ProductTable(props) {
        const productRows = props.prods.map(prod => <ProductRow
            key={prod.id} prod={prod} />);
        const borderedStyle = {border: "1px solid black", padding: 6};
        return (
        <table style={{borderCollapse: "collapse"}}>
        <thead>
        <tr>
        <th style={borderedStyle}>Name</th>
        <th style={borderedStyle}>Price</th>
        <th style={borderedStyle}>Category</th>
        <th style={borderedStyle}>ImageURL</th>
        </tr>
        </thead>
        <tbody>
            {productRows}
        </tbody>
        </table>
        );
    }
   
class ProductAdd extends React.Component {
    constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);  
    }
    handleSubmit(e){
        e.preventDefault();
        const form = document.forms.productAdd;
        const prod = {
            name: form.name.value, price: form.price.value, category: form.category.value, imageURL: form.imageURL.value,
        }
        this.props.createProduct(prod);
        form.name.value="";
        form.price.value="$";
        form.category.value="";
        form.imageURL.value="";
    }
    render() {
        return(
            <form name= "productAdd" onSubmit={this.handleSubmit}>
                <section>
                <h2>Add a new product to inventory</h2>
                    <div>
                     Name
                     <input type="text" name="name"/>
                     </div>
                     <div>
                     Price
                     <input type="text" name="price" defaultValue="$"/> 
                     </div>
                     <div>
                    Category
                     <select id="list" name="category">
                                    <option value="Shirts">Shirts</option>
                                    <option value="Jeans">Jeans</option>
                                    <option value="Jackets">Jackets</option>
                                    <option value="Sweaters">Sweaters</option>
                                    <option value="Accessories">Accessories</option>
                    </select>
                     </div>
                    <div>
                        Image URL
                        <input type="text" name="imageURL"/>
                    </div>
                     
                    </section>
                <section>
                    <button>Add Product</button>
                </section>
                
            </form>
        );
    }
   }
   function ProductRow (props) {
    const borderedStyle = {border: "1px solid black", padding: 4};
    const prod = props.prod;
    return (
    <tr>
    <td style={borderedStyle}>{prod.name}</td>
    <td style={borderedStyle}>{prod.price}</td>
    <td style={borderedStyle}>{prod.category}</td>
    <td style={borderedStyle}><a href={prod.imageURL} target="_blank">View</a></td>
    </tr>
    );
    
   }
class ProductList extends React.Component {
    constructor(){
        super();
        this.state = {prods:[],};
        this.createProduct = this.createProduct.bind(this);
    }
    componentDidMount(){
        this.loadData();
    }
    loadData(){
        setTimeout(()=> {
            this.setState({prods:[]});
        }, 500);
    }
    createProduct(newprod) {
        const newprods = this.state.prods.slice();
        newprod.id = this.state.prods.length + 1;
        newprods.push(newprod);
        this.setState({prods: newprods});
    }
    render() {
    return (
    
    <div>
    <h1>My Company Inventory</h1>
    <h2>Showing all available products </h2>
    <hr/>
    <ProductTable prods={this.state.prods} />
    <hr />
    <ProductAdd createProduct={this.createProduct}/>
    </div>
    );
    }
   }
  

   ReactDOM.render(<ProductList />, cNode); 
