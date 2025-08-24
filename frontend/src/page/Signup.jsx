import eyeIcon from "../assets/eye.png";
import FormComponent from "../component/FormComponent";

export default function Signup() {
    return (
        <section className="form-input">
            <FormComponent htmlFor="fullname" label="Full Name" type="text" placeholder="Enter your name"/>
            <FormComponent htmlFor="email" label="Email" type="email" placeholder="Enter your email"/>
            <FormComponent htmlFor="password" label="Password" type="password" placeholder="Enter your password"/>
            <FormComponent htmlFor="password" label="Confirm Password" type="password" placeholder="Enter confirm password"/>
            <img src={eyeIcon} alt="" className="eyeIcon" style={{ width: '20px', position: 'absolute' }} />
        </section>
    );
}