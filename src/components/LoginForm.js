import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'
import axios from 'axios'
import {connect, useDispatch} from 'react-redux'
import { changePermission } from '../redux/actions';


const LoginForm = (props) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [receivedData, setReceivedData] = useState([])
  const [wrongData, setWrongData] = useState(false)



  useEffect(() => {
    axios.get('http://localhost:5000/login')
    .then((response) => setReceivedData(response.data))
    .catch((err) => console.log('Wystąpił bład podczas pobierania danych logowania, błąd: ' + err))
    
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    receivedData.map(rd => {
        if(rd.login === login && rd.password === password){
            props.updatePermission()
            navigate('/login')
           
            
        }
        else {
            setPassword('')
            setLogin('')
            setWrongData(true)
        }
        
    })

  };

  return (
    <div className="app">
         <div className="info">
            <p className="info__description">Witaj login: admin  hasło: admin</p>
        </div>
        <Header/>
       
        <div className="loginForm">

        <h1>Posiadasz dostęp do aplikacji? Zaloguj się</h1>
        <h2>{wrongData ? 'login lub hasło są niepoprawne': null}</h2>
        
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Zaloguj się</button>
      </form>

      </div>

    </div>

    
  );
};





const mapDispatchToProps = (dispatch) => ({
  updatePermission: () => dispatch(changePermission()),  
});

export default connect(null, mapDispatchToProps)(LoginForm);
