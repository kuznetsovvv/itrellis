import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.css';
import './index.css';

function Header(){
    return (
        <header className="header" >
            <h1> Vladimir Kuznetsov </h1>
        </header> 
    );
}

class CarBox extends React.Component {
    render(){
        console.log("aaaa");
    return(
        <div className="carbox col-md-4">
            <h3>{this.props.color} {this.props.year} {this.props.make}</h3>
            <p>Only ${this.props.price}!</p>
            <ol>
            <li>Low Miles: {this.props.hasLowMiles.toString()}</li>    
            <li>Heated Seats: {this.props.hasHeatedSeats.toString()}</li>    
            <li>Navigation: {this.props.hasNavigation.toString()}</li>    
            <li>Power Windows: {this.props.hasPowerWindows.toString()}</li>  
            <li>Sun roof: {this.props.hasSunroof.toString()}</li>    
            <li>Four Wheel Drive: {this.props.isFourWheelDrive.toString()}</li>    
            </ol>
            <p><small>Reference code: {this.props.id}</small></p>
        </div>
        );
}
} 

class Results extends React.Component {
        render() {
            const carlist = this.props.cars.map((car, i) => {
          return(
                    <CarBox 
                    color={car.color}
                    year={car.year}
                    make={car.make}
                    price={car.price}
                    hasLowMiles={car.hasLowMiles}
                    hasHeatedSeats={car.hasHeatedSeats}
                    hasNavigation={car.hasNavigation}
                    hasPowerWindows={car.hasPowerWindows}
                    hasSunroof={car.hasSunroof}
                    isFourWheelDrive={car.isFourWheelDrive}
                    id={car._id}
                    />
          );
      });
    return (
      <div className="row">
        {carlist}
        </div>
    );
  }
}

class SelectMenu extends React.Component {
  render() {
      let yna = ["any", "true" ,"false"]
    const ynalist = yna.map((val, i) => {
          return(
          <option value={val}>
              {val}   
          </option>
          );
      });
    const colors = this.props.colors.map((color, i) => {
          return(
          <option value={color}>
              {color}   
          </option>
          );
      });
    const makes = this.props.makes.map((make, i) => {
          return(
          <option value={make}>
              {make}   
          </option>
          );
      });
    return (
      <form onSubmit={this.props.handleSubmit}>
        <h2>I want a car that:</h2>
        <br />
        <label>
          Painted in the color:    <br />
          <select
            name="color"
            value={this.props.formValues.color}
            onChange={this.props.handleInputChange} >
        {colors}
        </select>
        </label>
        <br />
        <label>
          Manufactured by:    <br />
          <select
            name="make"
            value={this.props.formValues.make}
            onChange={this.props.handleInputChange} >
        {makes}
        </select>
        </label>
        <br />
        <label>
          Has heated seats:    <br />
          <select
            name="hasHeatedSeats"
            value={this.props.formValues.hasHeatedSeats}
            onChange={this.props.handleInputChange} >
        {ynalist}
        </select>
        </label>
        <br />
        <label>
          Has low miles:    <br />
          <select
            name="hasLowMiles"
            value={this.props.formValues.hasLowMiles}
            onChange={this.props.handleInputChange} >
        {ynalist}
        </select>
        </label>
        <br />
        <label>
          Has navigation:    <br />
          <select
            name="hasNavigation"
            value={this.props.formValues.hasNavigation}
            onChange={this.props.handleInputChange} >
        {ynalist}
        </select>
        </label>
        <br />
        <label>
          Power Windows:    <br />
          <select
            name="hasPowerWindows"
            value={this.props.formValues.colohasPowerWindowsr}
            onChange={this.props.handleInputChange} >
        {ynalist}
        </select>
        </label>
        <br />
        <label>
          Sunroof:    <br />
          <select
            name="hasSunroof"
            value={this.props.formValues.hasSunroof}
            onChange={this.props.handleInputChange} >
        {ynalist}
        </select>
        </label>
        <br />
        <label>
          Has AWD/4WD:    <br />
          <select
            name="isFourWheelDrive"
            value={this.props.formValues.isFourWheelDrive}
            onChange={this.props.handleInputChange} >
        {ynalist}
        </select>
        </label>
        <br />
        <label>
          Costs at most:    <br />
          <input
            name="maxprice"
            type="number"
            value={this.props.formValues.maxprice}
            onChange={this.props.handleInputChange} />
        </label>
        <br />
        <label>
          Costs no less than:    <br />
          <input
            name="minprice"
            type="number"
            value={this.props.formValues.minprice}
            onChange={this.props.handleInputChange} />
        </label>
        <br />
        <label>
          Maxmimum Model Year:    <br />
          <input
            name="maxyear"
            type="number"
            value={this.props.formValues.maxyear}
            onChange={this.props.handleInputChange} />
        </label>
        <br />
        <label>
          Minimum Model Year:    <br />
          <input
            name="minyear"
            type="number"
            value={this.props.formValues.minyear}
            onChange={this.props.handleInputChange} />
        </label>
        <br />
        <input type="submit" value="Go!" />
      </form>
    );
  }
}

class Page extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            foundResults: 0,
            colors: ["any"],
            makes: ["any"], 
            formValues:{
                color: "any",
                hasHeatedSeats: "any",
                hasLowMiles: "any",
                hasNavigation: "any",
                hasPowerWindows: "any",
                hasSunroof: "any",
                isFourWheelDrive: "any",
                make: "any",
                maxprice: 1000000000, //Let's assume that $1bn is enough to include all cars at this little dealership...
                minprice: 0,
                maxyear: 2020,
                minyear: 2010,
            }
        };
        this.AllCars = [];
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.MatchingCars = [];
    }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const formValues = this.state.formValues;
    formValues[name]=value;
      this.setState({
          formValues: formValues,
      });
  }
  handleSubmit(event) {
    event.preventDefault();
      this.setState({
        foundResults: 0
      });
    this.MatchingCars = this.searchCars();
      this.setState({
        foundResults: this.MatchingCars.length
      });
  }
    
//We'll assume that we just make one API call to get all available cars on the client:
//This won't work well for very large datasets, where we'd want to create structured queries against a database backend.
//This application is not intended for a demonstration of backend work, however.    
  componentDidMount() {
    fetch("./apiresult.json") 
      .then(res => res.json())
      .then(
        (result) => {
          this.AllCars = result;
          this.populateMakeAndColor()
          this.setState({
            isLoaded: true,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
    populateMakeAndColor(){
        let self = this;
        this.AllCars.forEach(function(car){
            if(!self.state.makes.includes(car.make)){
                let makes=self.state.makes.slice();
                self.setState({
                    makes: makes.concat([car.make])        
                });
            }
        });
        this.AllCars.forEach(function(car){
            if(!self.state.colors.includes(car.color)){
                let colors=self.state.colors.slice();
                self.setState({
                    colors: colors.concat([car.color])        
                });
            }
        });
    }
    searchCars(){
        let params = [];
        let self = this;
        Object.keys(this.state.formValues).forEach(function(key,index) {
            // key: the name of the object key
            if(self.state.formValues[key] != "any"){
                params.push([key,self.state.formValues[key]]);
            }
        });
        return(this.searchCarsRecursor(this.AllCars, params));
    }
    searchCarsRecursor(carlist, params){
        if( params === undefined || params == 0 || params === []){
            return carlist;
        }else if (carlist === undefined || carlist.length == 0 ) {
            return;
        }else{
            let possiblecars = [];
            let curparam = params.pop();
            let paramname = curparam[0];
            let paramvalue = curparam[1];
            
            if (paramname.includes("min")){
                paramname = paramname.replace("min","");
                carlist.forEach(function(car){
                    if(car[paramname] >= paramvalue){
                        possiblecars.push(car);
                    }                     
                });
            
            }else if (paramname.includes("max")){
                paramname = paramname.replace("max","");
                carlist.forEach(function(car){
                    if(car[paramname] <= paramvalue){
                        possiblecars.push(car);
                    }                     
                });
            
            }else if(paramname.includes("color")||paramname.includes("make")){
            carlist.forEach(function(car){
                if(car[paramname] == paramvalue || paramvalue == "any"){
                    possiblecars.push(car);
                }                     
            });
            
            }else{
            carlist.forEach(function(car){
                let val = (paramvalue == "true");
                if(car[paramname] == val || paramvalue == "any"){
                    possiblecars.push(car);
                }                     
            });
            }
            
            return this.searchCarsRecursor(possiblecars, params)
        }
    }
    
  render() {
 
    const { error, isLoaded, AllCars,  SearchOptions, options } = this.state;                   
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        this.searchCars();
        return (
          <div className="Content">
            <Header> </Header>
            <div className="container"><div className="row">
            <div class="menu col-sm-3">            
            <SelectMenu 
            colors={this.state.colors}
            makes={this.state.makes}
            formValues={this.state.formValues}
            handleInputChange = {this.handleInputChange}
            handleSubmit= {this.handleSubmit}
            />
            </div>
            <div className="results-area col-sm-9 container">
                <Results
                    cars={this.MatchingCars}
                />
            </div>
            </div></div>
          </div>
        );
  }
  }
}

ReactDOM.render(
    <Page />,
  document.getElementById('root')
);