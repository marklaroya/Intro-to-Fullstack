import { Link } from "react-router-dom";
import axios from "axios"
import { useState } from "react";

export default function RegisterPage(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    function registerUser(ev){
        ev.preventDefault();
        axios.post('http://localhost:5173/register',{
            name,
            email,
            password
        });
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-32">
                <h1 className="text-4xl py-4 text-center mb-4" >Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input  type="text" placeholder="your name" 
                            value={name} onChange={
                            ev =>setName(ev.target.value)}>

                    </input>
                    
                    <input  type='email'placeholder="your@email.com" 
                            value={email} onChange = {
                            ev =>setEmail(ev.target.value)}>

                    </input>

                    <input  type='password' placeholder="password"
                            value={password} onChange= {
                            ev=>setPassword(ev.target.value)}>

                    </input>
                    
                    <button className="primary">Register</button>

                    <div className="text-center p-3 text-gray-500">
                        Already have an account?
                        <Link className="underline text-black"
                        to={"/login"}>login</Link>
                    
                    
                    </div>

                </form>
            </div>
        </div>
    );
}
