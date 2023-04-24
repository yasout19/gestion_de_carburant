import './ContactUs.css';
import "../index.css";
import { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
    const[name,setname]=useState("")
    const[email,setemail]=useState("")
    const[message,setmessage]=useState("")
    const send=(event)=>{
        event.preventDefault();
        axios.post("http://localhost:4000/feedback",{name:name,email:email,message:message,isUnRead:true,createdAt:new Date()}).then(result=>{if(result.data.status==="ok"){alert("your message is been sended ")}}).catch(err=>{console.log(err);})
    }
  return(
    <>
    <div class="contact-us section" id="contact">
        <div class="container">
            <div class="row">
                <div class="col-lg-6  align-self-center">
                <div class="section-heading">
                    <h6>Contact Us</h6>
                    <h2>Feel free to contact us anytime</h2>
                    <p>Thank you for choosing our website. We provide you best Services at absolutely 100% free of charge. You may support us by sharing our website to your friend.</p>
                </div>
                </div>
                <div class="col-lg-6">
                <div class="contact-us-content">
                    <form id="contact-form" onSubmit={send}>
                    <div class="row">
                        <div class="col-lg-12">
                        <fieldset>
                            <input type="name" name="name" id="name" placeholder="Your Name..." autocomplete="on" required onChange={(e)=>{setname(e.target.value)}}/>
                        </fieldset>
                        </div>
                        <div class="col-lg-12">
                        <fieldset>
                            <input type="text" name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your E-mail..." required="" onChange={(e)=>{setemail(e.target.value)}}/>
                        </fieldset>
                        </div>
                        <div class="col-lg-12">
                        <fieldset>
                            <textarea name="message" id="message" placeholder="Your Message" onChange={(e)=>{setmessage(e.target.value)}}></textarea>
                        </fieldset>
                        </div>
                        <div class="col-lg-12">
                        <fieldset>
                            <button type="submit" id="form-submit" class="orange-button" >Send Message Now</button>
                        </fieldset>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
} 

export default ContactUs;