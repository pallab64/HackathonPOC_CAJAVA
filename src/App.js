import React, { Component } from 'react';
import Welcome from './Welcome';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


export default class Courses extends Component {
   
    constructor(p) {
        super(p);
        this.state = {
            message:'',
            latitude: 0,
           longitude: 0,
           disaster:'',
           damage_type:'',
           affected_levelcount:'',
           affected_level:'',
           property_type:'',
           formError: false,
           drpdownErr:null,
           list : []
        };
       
        this.handleChange = this.handleChange.bind(this);
      
    }
    componentDidMount() {
      let currentComponent = this;
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function(position) {       
             currentComponent.setState({latitude:position.coords.latitude
            ,
            longitude:position.coords.longitude
          });
       
        });
       
      }
    }
    handleChange(event)
     {   
        this.setState({disaster: event.target.value});  
    }
    handleChangedamage = (event) => {
      this.setState({damage_type: event.target.value});  
    };
    handleProperttype = (event) => {
      this.setState({property_type: event.target.value});  
    };
    handleaffectedlevelcount = (event) => {
      this.setState({affected_levelcount: event.target.value});  
    };
    handleaffectedlevel = (event) => {
      this.setState({affected_level: event.target.value});  
    };
    onCreateEmployee=e=>{
      const  disasterDhow  = this.state.disaster;
      if(disasterDhow===''){
      this.setState({drpdownErr:'Mandatory Field'});
      this.setState({formError:true});
      e.preventDefault();
      }
      else{
        this.setState({drpdownErr:null});
        let empinfo={
        disaster:this.state.disaster,  
        name:this.refs.name.value,    
        mobile_no:this.refs.mobile.value,
        damage_type:this.state.damage_type,
        property_type:this.state.property_type,
        latitude:this.state.latitude,
        longitude:this.state.longitude,
        damage_cost:this.refs.dcost.value,
        address:this.refs.address.value,
        affected_people:this.state.affected_levelcount,
        affected_level:this.state.affected_level,
        damage_description:this.refs.d_description.value
        };
     
        console.log(empinfo);
     
     
        fetch('https://96a18cf0.eu-gb.apigw.appdomain.cloud/save_disaster_api/saveDisasterDetails',{
              method: 'POST',
              headers:{
                'x-ibm-client-id':'4f3c4239-baa7-4a1d-9758-d7825d74e6dc',
              'Content-type':'application/json'
            },
                body:JSON.stringify(empinfo)
            }).then(r=>r.json()).then(res=>{
              if(res){
                console.log(res);
               
                this.props.history.push({pathname:'/Welcome',
                state :{
                 disaster:this.state.disaster,   
                 latitude:this.state.latitude,
                 longitude:this.state.longitude
                 }
               
               });
              }
            });
            this.setState({message:'New row inserted'});
          }
        }
           

render(){
    return(
   <div>
  <center><b>PostDisaster Resilience System</b></center><br/>
<div className="form-group">
       <label>Enter Disaster Type:</label>
<select className="form-control" value={this.state.disaster} onChange={this.handleChange}> 
           <option>Select disaster type</option>
            <option value="flood">Flood</option>
            <option value="fire">Fire</option>
            <option value="cyclone">Cyclone</option>
            <option value="earthquake">Earthquake</option>
          </select><br/>
  </div>
<label>Name:</label>
<input type = "text" className="form-control" ref = "name"></input><br/>
<label>Mobile No:</label>
<input type = "text" className="form-control" ref = "mobile"></input><br/>
<label>Enter Damage Type:</label>
<select value={this.state.damage_type}
className="form-control"
onChange={this.handleChangedamage}> 
           <option>Select damage type</option>
            <option value="house">House</option>
            <option value="school">School</option>
            <option value="road">Road</option>
            <option value="hospital">Hospital</option>
          </select><br/>
  <label>Enter Property Type:</label>
          <select value={this.state.property_type}
          className="form-control"
           onChange={this.handleProperttype}> 
           <option>Select property type</option>
            <option value="private">Private</option>
            <option value="public">Public</option>
            <option value="commercial">Commercial</option>
            <option value="not-sure">not-sure</option>
          </select><br/>
<label>Enter Damage Cost:</label>
<input type = "text" ref = "dcost"></input><br/>
<div className="form-group">
<label>Address:</label>
<input type = "text" className="form-control" ref = "address"></input><br/>
<label>No. of affected people:</label>

<select value={this.state.affected_level}
className="form-control"
onChange={this.handleaffectedlevelcount}> 
           <option>Select affected_level</option>
            <option value="major">Greater than 40</option>
            <option value="minor">Less than 20</option>
            <option value="sevre">Greater than 100</option>
</select><br/>
<br/>
<label> Affected:</label>
<select value={this.state.affected_level}
className="form-control"
onChange={this.handleaffectedlevel}> 
           <option>Select affected_level</option>
            <option value="major">Major</option>
            <option value="minor">Minor</option>
            <option value="sevre">Sevre</option>
</select><br/>
</div>
<label>Description:</label>
          <textArea 
          className="form-control"
            required 
            name="description"
            placeholder="Your damage description..."
            ref = "d_description"
        /><br/>
<center><button   onClick={this.onCreateEmployee}>Submit</button></center>
{this.state.message}





 
</div>
    );
}

}
