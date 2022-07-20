import { KillerType, User } from "../Interfaces/User";

export async function LoginUser({email,password,api}:{email:string,password:string,api:string}):Promise<{
    refreshToken:string,
    accessToken:string,
    userID:string
}>
{
    const loginResponse = await fetch(`${api}/auth/login`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:email,
            password:password
        })
    });

    const {accessToken, refreshToken, id}:{accessToken:string,refreshToken:string,id:string} = await loginResponse.json();

    localStorage.setItem("refreshtoken",refreshToken);
    localStorage.setItem("accesstoken",accessToken);
    localStorage.setItem("userid", id);

    return {
        accessToken, 
        refreshToken,
        userID:id
    };
}

export interface AuthUser
{
    group:string,
    email:string,
    password:string,
    forename:string,
    lastname:string,
    phone:string,
    type:KillerType,
    year:number
}

export async function SignUpUser({signUpUser,api}:{signUpUser:AuthUser,api:string}):Promise<{
    user:User,
    refreshToken:string,
    accessToken:string
}>
{
    const createResponse = await fetch(`${api}/auth/create`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            group:signUpUser.group,
            email:signUpUser.email,
            password:signUpUser.password,
            forename:signUpUser.forename,
            lastname:signUpUser.lastname,
            phone:signUpUser.phone,
            type:signUpUser.type,
            year:signUpUser.year
        })
    });
    
    const user = await createResponse.json();

    const {accessToken, refreshToken} = await LoginUser({
        email:user.email,
        password:signUpUser.password,
        api
    });

    return {user,accessToken,refreshToken};
}