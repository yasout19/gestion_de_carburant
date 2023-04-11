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
        axios.post("http://localhost:4000/getuser",{token:window.localStorage.getItem("token")}).then(result=>{if(result.data.role==="admin"){window.location.href="/dashboard"}else{this.setState({email:result.data.email})
    console.log(result.data);this.setState({nom:result.data.name}); this.setState({password:result.data.pwd})}
    })
    }

render(){
    const logout=()=>{
        window.localStorage.clear();
        window.location.href="./login"
    }
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