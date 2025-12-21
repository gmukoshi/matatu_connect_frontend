import React from "react";

function LoginPage(){
    return(
   <div>
    <LoginCard />
   </div>
    )}

export default LoginPage;

function LoginCard(){
    return(
        <div>
        <BrandHeader/>
        <RoleSwitcher/>
        <LoginForm/>
        <Divider/>
        <GoogleButton/>
        <SignupPrompt/>
        </div>
    )
}

function BrandHeader(){
    return(
        <div>BrandHeader</div>
    )
}

function RoleSwitcher(){
    return(
        <div>RoleSwitcher</div>
    )
}

function LoginForm(){
    return(
        <div>
        <PhoneInput />
        <PasswordInput />
        <ForgotPasswordLink />
        <LoginButton />
        </div>
    )
}

function Divider(){
    return (
        <div>Divider</div>
    )
}

function GoogleButton(){
    return(
        <div>GoogleButton</div>
    )
}

function SignupPrompt(){
    return(
        <div>SignupPrompt</div>
    )
}