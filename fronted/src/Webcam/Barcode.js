 
import React from 'react';
import JsBarcode from 'jsbarcode';
import './Barcode.css';
 

class BarcodeGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '',
      email: '',
      barcodeValue: '' // Concatenating product ID and email
    };
    this.barcodeRef = React.createRef();
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { productId, email } = this.state;
    const barcodeValue = `${productId}_${email}`;
    this.setState({ barcodeValue }, () => {
      this.generateBarcode();
    });
  };

  handleClear = () => {
    this.setState({
      productId: '',
      email: '',
      barcodeValue: ''
    }) 
  };
  

  generateBarcode = () => {
    const { barcodeValue } = this.state;
    JsBarcode(this.barcodeRef.current, barcodeValue, {
      format: 'CODE128', // Using CODE128 format
      displayValue: true, // Show the value below the barcode
      width: 1.5, // Bar width
      height: 80, // Bar height
      margin: 10, // Margin around the barcode
    });
  };

  render() {
    return (
      <div className="container">
        
        {/* <h2  className='headings' >Barcode Generator</h2> */}
        
         
        <form onSubmit={this.handleSubmit}>
          <label>
            Product ID:
            <input
              type="text"
              name="productId"
              value={this.state.productId}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            User's Email:
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <br />
          <button type="submit">Generate Barcode</button>
          <button type="button" onClick={this.handleClear}>Clear</button>
        </form>
        <svg className="barcode"ref={this.barcodeRef}></svg>

    
      </div>
    );
  }
}

export default BarcodeGenerator;

