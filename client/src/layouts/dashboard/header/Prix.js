import React from 'react';
import axios from 'axios';
import { useEffect,useState } from 'react';
import Label from 'src/components/label/Label';
import { sentenceCase } from 'change-case';

function Prix() {
    const[prix_g,setprix_g]=useState("0");
    const[prix_e,setprix_e]=useState("0");
    useEffect(()=>{
        axios.get("http://localhost:4000/prix").then(res=>{console.log(res.data.prix_e);setprix_e(res.data.prix_e);setprix_g(res.data.prix_g)}).catch(err=>{console.log(err)})
    }, [])
  return (
    <div><p><Label color={'success'}>{sentenceCase("essence")}</Label>{prix_e}<Label color={'warning'}>{sentenceCase("gazoil")}</Label>{prix_g}</p></div>
  )
}

export default Prix;