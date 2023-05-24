import axios from 'axios';
import {useState} from 'react';
import { Link} from 'react-router-dom';
import './Login.css';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { yellow, red } from '@mui/material/colors';
function Login(){
   const [email,setemail]=useState("");
   const [pwd,setpwd]=useState("");
   const [alert1,setalert1]=useState(false);
   const [alert2,setalert2]=useState(false);
   
const log=()=>{
    if(email.length>5 && pwd.length>2){
    axios.post('http://localhost:4000/signin',{email:email,pwd:pwd}).then(resultat=>{
    if(resultat.data.status==='ok') {console.log(resultat.data.data); window.localStorage.setItem("token",resultat.data.data);window.localStorage.setItem("logged",true);window.location.href="./user";  }
   else {setalert2(false);setalert1(true)}}).catch(err=>{console.log(err)})}
   else{setalert1(false);setalert2(true)}
}

return(
    <div>
        {alert1 ? <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error" sx={{ color: red[500], backgroundColor: red[100] }}>
                         mot de passe ou email incorrect
                    </Alert>
                </Stack> : null}
        {alert2 ? <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="warning" sx={{ color: yellow[700], backgroundColor: yellow[50] }}>
                    make sure your informations are valid
                    </Alert>
                </Stack> : null}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />

<section class='section1'>
        <div class="form-box">
            <div class="form-value">
                <form action="">
                    <h2 class='titre'>Login</h2>
                    <div class="inputbox">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="email" required  onChange={e=>setemail(e.target.value)} placeholder=" " />
                        <label for="">Email</label>
                    </div>
                    <div class="inputbox">
                    <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type="password" required onChange={e=>setpwd(e.target.value)} placeholder=" "/>
                        <label for="">Password</label>
                    </div>
                    <div class="forget">
                        <label for=""><input type="checkbox"/>Remember Me  <Link to="/reset">Forget Password </Link></label>
                      
                    </div>
                    <button class="button" type='button' onClick={log}>Log in</button>
                    <div class="register">
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    </section>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
</div>


);
}
export default Login;