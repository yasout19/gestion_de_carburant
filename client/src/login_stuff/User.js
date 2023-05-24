import React,{Component} from "react";
import axios from "axios";
import "./Loading.css";
export default class User extends Component{
    constructor(props){
        super(props)
        this.state={
            nom:"",
            email:"",
            password:""
    }
    }
    

    
    componentDidMount(){
        axios.post("http://localhost:4000/getuser",{token:window.localStorage.getItem("token")}).then(result=>{if(result.data.role==="admin"){window.localStorage.setItem("admin",'true');window.location.href="/dashboard"}else{window.localStorage.setItem("admin",'false');window.location.href="/dashboard2";
    console.log(result.data);this.setState({nom:result.data.name}); this.setState({password:result.data.pwd})}
    })
    }

render(){
    return(
        <div class="loader">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
    </div>
    



    );
}
}