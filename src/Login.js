import {useRef,useState,useEffect} from 'react';

const Login=()=>{

    const userRef=useRef(null);
    const errRef=useRef();

    const [user,setUser]=useState('');
    const[pwd,setPwd]=useState('');
    const[errMsg,setErrMsg]=useState('');
    const[success,setSuccess]=useState(false);

    useEffect(()=>{
        userRef.current.focus();
    },[])
    useEffect(()=>{
        setErrMsg('');
    },[user,pwd])
    return(
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
            
        </section>
    )
}

export default Login