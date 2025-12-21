import React, {useState} from "react";

function LoginPage(){
const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
    return(
   <div>
    <LoginCard />
   </div>
    )}

export default LoginPage;

function LoginCard({username,setUsername,password,setPassword}){
    return(
        <div>
        <BrandHeader/>
        <RoleSwitcher/>
        <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
        <Divider/>
        <GoogleButton/>
        <SignupPrompt/>
        </div>
    );
}

function BrandHeader(){
    return(
        <div>BrandHeader</div>
    );
}

function RoleSwitcher(){
    return(
        <div>RoleSwitcher</div>
    );
}

function LoginForm(){
    return(
        <div>
        <UsernameInput />
        <PasswordInput />
        <ForgotPasswordLink />
        <LoginButton />
        </div>
    );
}

function Divider(){
    return (
        <div>Divider</div>
    );
}

function GoogleButton(){
    return(
        <div>GoogleButton</div>
    );
}

function SignupPrompt(){
    return(
        <div>
            <p>Don't have an account</p>
            <button type="button">Sign up</button>
        </div>
    );
}

function UsernameInput(){
    return(
        <div>usernameInput</div>
    );
}

function PasswordInput(){
    return(
        <div>PasswordInput</div>
    );
}

function ForgotPasswordLink(){
    return(
        <div>ForgotPasswordLink</div>
    );
}

function LoginButton(){
    return(
        <div>LoginButton</div>
    );
}