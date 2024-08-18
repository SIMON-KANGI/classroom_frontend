import { Form, Formik,Field } from 'formik'
import React, {useState} from 'react'

function SignUp() {
    const [formData, setFormData] = useState({
        name:"",
        email:'',
        password: ''
      
    })
    function handleSubmit(){

    }
  return (
    <div>
    <h1 className='text-center text-2xl'>Login</h1>
      <Formik>
<Form>
    <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name:e.target.value})} />
  
    </div>
    <div>
        <label htmlFor="name">Email:</label>
        <input type="text" id="email" name="email" value={formData.email} onChange={(e) => setFormData({...formData, email:e.target.value})} />
  
    </div>
    <div>
        <label htmlFor="name">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={(e) => setFormData({...formData, password:e.target.value})} />
        </div>
</Form>
      </Formik>
    </div>
  )
}

export default SignUp
