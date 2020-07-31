import React, { Component } from 'react';

export default class Welcome extends Component {


    constructor(props) {
        super(props);
      
        this.state = {
           
           list : []
        };
    }

   
       

    render(){
        
        return( 
           <div>
     <b>You can contact following people to get urgent help</b>
          <ul>
         <li>Sourav || 984512569</li>
         <li>Rakesh || 984512563</li>
        </ul>
           </div>
       
       
       
        );
    }
}