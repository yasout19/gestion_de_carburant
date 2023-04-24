import axios from 'axios';
import {useState,useEffect} from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { yellow, red ,lightGreen} from '@mui/material/colors';
export default function Reset(){
const [email,setemail]=useState("");
const [alert1,setalert1]=useState(false);
const [alert2,setalert2]=useState(false);
const validate=()=>{
        axios.post('http://localhost:4000/reset',{email:email}).then(result=>{if(result.data.status==="ok"){setalert2(false);setalert1(true);  setTimeout(() => {window.location.href = "./login";}, 3000);}else{setalert1(false);setalert2(true);}}).catch(err=>{console.log(err)});
}
return(
<div>
{alert1 ? <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="success" sx={{ color: lightGreen[800], backgroundColor: lightGreen[100] }}>
                        check your email
                    </Alert>
                </Stack> : null}
        {alert2 ? <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="warning" sx={{ color: yellow[700], backgroundColor: yellow[50] }}>
                    user not found 
                    </Alert>
                </Stack> : null}
<section class='section1'>
        <div class="form-box">
            <div class="form-value">
                <form action="">
                    <h2 class='titre'>your account's email</h2>
                    <div class="inputbox">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="email" required placeholder=" " onChange={e=>{setemail(e.target.value)}} />
                        <label for="">Email</label>
                    </div>
                    <button  class="button" type='button' onClick={validate}>validate</button>
                </form>
            </div>
        </div>
    </section>



</div>


);


}