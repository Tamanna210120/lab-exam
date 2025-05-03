import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import useAxiosPublic from "./useAxiosPublic";
import SocialLogIn from "./SociaLogin";

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
        createUser(data.email, data.password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            updateUserProfile(data.name, data.photoURL)
            .then(() => {
                const userInfo = {
                    name:data.name,
                    email:data.email,
                    photo:data.photoURL
                }
                axiosPublic.post('/users',userInfo)
                .then(res => {
                    if(res.data.insertedId)
                        reset();
                
                navigate(from, { replace: true });
                })
            })
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
    };

    return (
        <div>
            <div className="hero min-h-screen" style={{ backgroundImage: '' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="w-[650px] bg-white/35 rounded-xl">
                        <h2 className="mt-8 text-4xl text-black font-semibold">Register Here</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control ">
                                <label className="label ">
                                    <span className="label-text text-xl">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered text-xl text-black" />
                                {errors.name && <span className="text-yellow-400 font-medium">This field is required</span>}
                            </div>
                            {/* <div className="form-control ">
                                <label className="label ">
                                    <span className="label-text text-xl">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered text-xl text-black" />
                                {errors.photoURL && <span className="text-yellow-400 font-medium">This field is required</span>}
                            </div> */}
                            <div className="form-control ">
                                <label className="label ">
                                    <span className="label-text text-xl">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="Email" className="input input-bordered text-xl text-black" />
                                {errors.email && <span className="text-yellow-400 font-medium">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl">Password</span>
                                </label>
                                <input type="password" {...register("password", { required: true })} name="password" placeholder="Password" className="input input-bordered text-xl text-black" />
                                {errors.password && <span className="text-yellow-400 font-medium">This field is required</span>}
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" value="Register" className="btn bg-lime-200 text-2xl font-semibold" />
                            </div>
                            <div className="divider">OR</div>
                            <SocialLogIn></SocialLogIn>
                        </form>
                        <h3 className='mb-8 text-black text-2xl '>Already have an Account? <span className='font-bold'><Link to="/login">Log In Now</Link></span></h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
