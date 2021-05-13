import React,{useState} from 'react';
import '../App.css';
import axios from "axios";
//import useForm from './LoginFormHandler';

const LoginForm = () => {
    let initform ={
      email:"",
      password:""
    }

    const [form,setForm] = useState(initform);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setForm({ ...form, [name]: value });
    }

    const submit = (e) => {
      e.preventDefault();
      console.log(form.email);
      const login = {
        email : form.email,
        password : form.password
      }
      axios.post('http://localhost:4000/app/login/',login)
      .then(response => console.log(response.data))

      //window.location = '/profile';
    }

    return (
      <div className="main-container col-md-12">
        <div className="container col-md-8">
        <form onSubmit ={submit} className="align-items-sm-center  ">
          <div className="col-md-3">
            <label htmlFor="inputEmail4" className="form-label">Email</label>
            <input type="email"  name="email" onChange={handleChange} className="form-control" id="inputEmail4" />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputPassword4" className="form-label">Password</label>
            <input type="password" name="password"  onChange={handleChange}  className="form-control" id="inputPassword4" />
           </div>
           <br />
          <div className="col-12">
            <button type="submit"  className="btn btn-primary">Sign in</button>
          </div>
        </form>
      </div>
      </div>
    )
}
export default LoginForm;