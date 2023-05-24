import {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { yellow, red ,lightGreen} from '@mui/material/colors';
function Register() {
    const handlesubmit=(e)=>{
      e.preventDefault();
    }
    const[email,setemail]=useState("");
    const[pwd,setpwd]=useState("");
    const[pwd1,setpwd1]=useState("");
    const [alert1,setalert1]=useState(false);
    const [alert2,setalert2]=useState(false);
    const [alert3,setalert3]=useState(false);
    const [alert4,setalert4]=useState(false);
    const handlealert=()=>{
        setalert1(false);
        setalert2(false);
        setalert3(false);
        setalert4(false);
    }
    const createuser=()=>{
      if(email.length>4 && pwd.length>3){
        if(pwd===pwd1){
        axios.post('http://localhost:4000/createuser',{email:email,pwd:pwd}).then((resultat)=>{if(resultat.data.status==="ok") {console.log(resultat.data.data);handlealert();setalert1(true)} else{handlealert();setalert2(true)}}).catch(err=>{console.log(err)})}
        else{ handlealert();setalert3(true)}
      }
      else{handlealert();setalert4(true)}
  }
  return (
    <div>
        {alert1 ? <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="success" sx={{ color: lightGreen[800], backgroundColor: lightGreen[100] }}>
                        user created seccefully
                    </Alert>
                </Stack> : null}
        {alert2 ? <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="warning" sx={{ color: yellow[700], backgroundColor: yellow[50] }}>
                    ce email exist deja 
                    </Alert>
                </Stack> : null}
                {alert3 ? <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error" sx={{ color: red[500], backgroundColor: red[100] }}>
                   password doesn't much
                    </Alert>
                </Stack> : null}
                {alert4 ? <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="warning" sx={{ color: yellow[700], backgroundColor: yellow[50] }}>
                    make sure your informations are valid
                    </Alert>
                </Stack> : null}
       <section class='section1'>
        <div class="form-box">
            <div class="form-value">
                <form action="" onSubmit={handlesubmit}>
                    <h2 class='titre'>create account</h2>
                    <div class="inputbox">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="email" required onChange={e=>{setemail(e.target.value)}}/>
                        <label for="">Email</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type="password" required onChange={e=>{setpwd(e.target.value)}}/>
                        <label for="">Password</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type="password" required onChange={e=>{setpwd1(e.target.value)}}/>
                        <label for="">repeat Password</label>
                    </div>
                    <div class="forget">
                        
                      
                    </div>
                    <button  class="button" onClick={createuser}>create</button>
                    <div class="register">
                        <p>you have account? <Link to="/login">sign in</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </section>



    </div>
    
  )
}

export default Register;