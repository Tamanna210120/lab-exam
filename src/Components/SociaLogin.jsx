import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "./useAxiosPublic";
import { AuthContext } from "./AuthProvider";

const SocialLogIn = () => {
    const { googleSignIn } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    email:result.user.email,
                    name:result.user?.displayName,
                    photo:result.user?.photoURL
                }
                axiosPublic.post('/users' , userInfo)
                .then(res=>{
                    console.log(res.data);
                    navigate('/');
                })
                navigate('/');
            })
    }
    return (
        <div>
            <button onClick={handleGoogleSignIn} className="btn w-full text-2xl font-semibold bg-white/35">Sign In With <img src="https://i.ibb.co/TLh1bgK/google-symbol.png" alt="" className="h-8 w-8" /></button>
        </div>
    );
};

export default SocialLogIn;
