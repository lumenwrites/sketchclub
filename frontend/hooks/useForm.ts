import { useEffect, useState } from 'react';

export default function useForm(initial: any = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  // It takes awhile for initial values to load. At first they're null, but then the EditPost
  // fetches the values I want to put into the form. This useEffect makes sure they're updated.
  // we load values into state when this changes. If we watched for state change, it'd be an infinite loop
  const initialValues = Object.values(initial).join(''); 
  useEffect(() => { setInputs(initial) }, [initialValues]);

  function handleChange(e) {
    let { value, name } = e.target;
    // console.log(value)
    setInputs({...inputs, [name]: value })
  }
  function setValue(name, value) {
    // console.log(value)
    setInputs({...inputs, [name]: value })
  }

  return { inputs, handleChange, setValue }
}
