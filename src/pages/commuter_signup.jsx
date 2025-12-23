import React from "react";

function CommuterSignup(){
    return <Commuter />
};
const [firstname,setfirstname]=usestate("")
const [secondname,setsecondname]=usestate("")
const [email,setemail]=usestate("")
const[password,setpassword]=usestate("")
export default CommuterSignup;

function Commuter(){

    return(
    <div>
    <MatatuConnect />
    <CreateAccount />
    <GoogleButton />
    <AppleButton />
    <RegisterwithMail />
    <Signupform username={username} setusername={username} email={email} setemail={email} password={password} setpassword={password}/>
    <Signupbutton />
    <Rightpanelimage />
    <Rightpanel />
    <Rightpaneldash />
    
    </div>
);
}

function MatatuConnect(){
    return(
        <div>MatatuConnect</div>
    );
}

function CreateAccount(){
    return(
        <div>CreateAccount</div>
    );
}

function GoogleButton(){
    return (
        <div>Google Button</div>
    );
}

function AppleButton(){
    return (
        <div>Apple Button</div>
    );
}

function RegisterwithMail(){
    return(
        <div>Register with mail</div>
    );
}

function Signupform({username, setusername, email, setemail,password,setpassword}){
    return(
        <form>
        <div>
            <firstname />
            <secondname />
            <email />
            <password />
        </div>
        </form>
    );
}

function Signupbutton(){
    return(
        <div>signupbutton</div>
    );
}

function Rightpanelimage(){
    return(
        <div>image</div>
    );
}

function Rightpanel(){
    return(
        <div>blog</div>
    );
}

function Rightpaneldash(){
    return(
        <div>dash</div>
    );
}
function firstname(){
    return(
        <div>firstname</div>
    );
}
function secondname(){
    return(
        <div>secondname</div>
    );
}
function email(){
    return(
        <div>email</div>
    );
}
function password(){
    return(
        <div>password</div>
    );
}
            