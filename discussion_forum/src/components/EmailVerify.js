import React ,{useState,useEffect,Fragment,useContext}from 'react'
import { useParams,Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { userContext } from "../App";

const EmailVerify = () => {
    const [validUrl, setValidUrl]= useState(false);
    const param = useParams();
    const {state,dispatch} = useContext(userContext);

    const Navigate = useNavigate();
    useEffect(() => { 
        const verifyEmailUrl = async () =>{
            try{ 
                console.log(`=----=====---------   users/${param.id}  /verify/  ${param.token} `);
                const url= `/users/${param.id}/verify/${param.token}`;
                // const url = `${process.env.BASE_URL}/api/users/${param.id}/verify/${param.token}`;


                // fetch('/users/:id/verify/:token',{
                //     method: "GET",
                //     headers: {
                //         Accept: "application/json",
                //         "Content-Type": "application/json"
                //     },
                //     credentials: "include"
                // }).then((res) => {
                //     dispatch({type:"USER", payload: false});
        
                // setValidUrl(true);
        
                //     if(res.status != 200 ){
                //         const error = new Error(res.error);
                //         throw error;
                //     }
        
                // }).catch((err) => {
                //     console.log(err);
                
            
                // })

    // const data =await res.json();

                const {data} = await axios.get(url);
                console.log(`+////////////////// ${data}`);
                setValidUrl(true);
            }
            catch(error){
                console.log(error);
                window.alert(error);
                setValidUrl(false);
            }   
        };

        verifyEmailUrl();

    },[param])
  return (
    <div>
        {validUrl ? (
<div>
    <h1>Email Verified Successfully</h1>
    <Link to="/login">
        <button>Login</button>
    </Link>
</div>
            ) : (

                <h1>404 Not Found </h1>
            )
        }
    </div>
  )
}

export default EmailVerify;