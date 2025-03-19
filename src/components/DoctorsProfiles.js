import React, { useState, useEffect } from 'react'
import Header from './Header';
import {useNavigate, Link} from 'react-router-dom'
import {connect, useDispatch} from 'react-redux'
import { changePermission } from '../redux/actions'
import {getPermissionInfo} from '../redux/permissionselector'
import axios from 'axios'

const DoctorsProfiles = ({updatePermission, permission}) => {

  const [doctors, setDoctors] = useState([])
  const [visibilityEditForm, setVisibilityEditForm] = useState(null)
  const [editingName, setEditingName] = useState('')
  const [editingSurname, setEditingSurname] = useState('')
  const [editingAccessCode, setEditingAccessCode] = useState('')
  const [editingPwz, setEditingPwz] = useState('')
  const [editingPhoneNumber, setEditingPhoneNumber] = useState('')
  const [editingAddress, setEditingAddress] = useState('')
  const [editingId, setEditingId] = useState('')


  useEffect(() => {
    axios.get('http://localhost:5000/doctors')
    .then((response) => setDoctors(response.data))
    .catch((err) => console.log('Wystąpił błąd podczas pobierania danych lekarzy, błąd:' + err))

  }, [])

const navigate = useNavigate()
   

    const handleLogOut = () => {
        updatePermission()
        navigate('/')
       
    }

    const handleBackToMainMenu = () => {
      navigate('/login')
    }

    const handleAddDoctor = () => {
      navigate('/adddoctor')
    }

    const handleDeleteDoctor = (id) => {
      axios.delete(`http://localhost:5000/doctors/${id}`)
      .then(() => setDoctors(doctors.filter(doctor => doctor._id !== id)))
      .catch((err) => console.error("Error deleting doctor:", err));
    }


    // tu jest ok bo to są nazwy parametrów które mogą być dodolne name=> doctor.name


    const handleEditDoctor = (id, name, surname, accesscode, pwz, phonenumber, address) => {
      scrollToTop()
      setVisibilityEditForm(true)
      setEditingName(name)
      setEditingSurname(surname)
      setEditingAccessCode(accesscode)
      setEditingPwz(pwz)
      setEditingPhoneNumber(phonenumber)
      setEditingAddress(address)
      setEditingId(id)

    }


   const saveDoctor = () => {
    const name = editingName
    const surname = editingSurname 
    const accesscode = editingAccessCode
    const pwz = editingPwz
    const phonenumber = editingPhoneNumber
    const address = editingAddress
    axios.put(`http://localhost:5000/doctors/${editingId}`, {name, surname, accesscode, pwz, phonenumber, address})
   .then((response) => {
           setDoctors(doctors.map(doctor => doctor._id === editingId ? response.data : doctor));
           setEditingId(null); // Zakończ edycję
           setEditingName('')
           setEditingSurname('')
           setEditingAccessCode('')
           setEditingPwz('')
           setEditingPhoneNumber('')
           setEditingAddress('')
          })
     .catch((err) => console.error("Error updating doctor:", err));
     setVisibilityEditForm(null)
   } 
  

 
   const  scrollToTop = () =>  {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


    return(
        <div className="app">
        <Header/>
        {!permission ? (<div className="logout">
                    <button className="adddoctor" onClick={handleAddDoctor}>Dodaj lekarza</button>
                    <button className="returntomainmenu" onClick={handleBackToMainMenu}>Główne menu</button>
                    <button className="logout" onClick={ handleLogOut}>Wyloguj się</button>
                </div> ): (<div className="youwerelogout"><h1 className="subpage">Zostałeś wylogowany</h1>  <Link to="/">Home</Link></div>)}    
        <div className="sitecontent">

        {visibilityEditForm ? <><h1>Edycja lekarza</h1>
          
            <label>imię: <input type="text" placeholder="imię" name="name"  value={editingName} onChange={(e) => setEditingName(e.target.value)}></input></label>
            <label>nazwisko: <input type="text" placeholder="nazwisko" name="surname"  value={editingSurname} onChange={(e) => setEditingSurname(e.target.value)}></input></label>
            <label>kod dostępu: <input type="text" placeholder="kod dostępu"  name="accesscode" maxLength="4"  value={editingAccessCode} onChange={(e) => setEditingAccessCode(e.target.value)}></input></label>
            <label>pwz: <input type="text" placeholder="pwz"  value={editingPwz} name="pwz" maxLength="7" onChange={(e) => setEditingPwz(e.target.value)}></input></label>
            <label>numer telefonu: <input type="text" placeholder="numer telefonu"  name="phonenumber" value={editingPhoneNumber} onChange={(e) => setEditingPhoneNumber(e.target.value)}></input></label>
            <label>adres gabinetu: <input type="text" placeholder="adres gabinetu"  name="address" value={editingAddress} onChange={(e) => setEditingAddress(e.target.value)}></input></label>
            <button onClick={saveDoctor}>Zapisz</button>
          
          </>
         : null}

        <h1>Profile lekarzy</h1>
        
        <div className="doctorsProfiles">
          {doctors.map(doctor => <div className="doctorsProfiles__item" key={doctor._id}><h1>imię: {doctor.name} nazwisko: {doctor.surname}</h1><h3>kod dostępu: {doctor.accesscode}</h3><h3>numer pwz: {doctor.pwz}</h3><h3>numer telefonu: {doctor.phonenumber}</h3><h3>adres gabinetu: {doctor.address}</h3><button className="edit" onClick={() => handleEditDoctor(doctor._id, doctor.name, doctor.surname, doctor.accesscode, doctor.pwz, doctor.phonenumber, doctor.address)}>Edytuj profil</button><button className="delete" onClick={() => handleDeleteDoctor(doctor._id)}>Usuń profil</button><button className="setAsActive">Ustaw jako aktywny</button></div>)}
        </div>
        </div>

        
        </div>
    )
}


const mapStateToProps = state => ({
    permission: getPermissionInfo()
  })

const mapDispatchToProps = (dispatch) => ({
  updatePermission: () => dispatch(changePermission()),  
});

export default connect(null, mapDispatchToProps)(DoctorsProfiles);
