import React from 'react'
import Header from './Header';
import {useNavigate, Link} from 'react-router-dom'
import {connect, useDispatch} from 'react-redux'
import { changePermission } from '../redux/actions'
import {getPermissionInfo} from '../redux/permissionselector'

const RecipesList = ({updatePermission, permission}) => {


    const navigate = useNavigate()
           
        
            const handleLogOut = () => {
                updatePermission()
                navigate('/')
               
            }
            const handleBackToMainMenu = () => {
              navigate('/login')
            }
    
    return(
        <div className="app">
        <Header/>
        {!permission ? (<div className="logout">
                    <button className="returntomainmenu" onClick={handleBackToMainMenu}>Główne menu</button>
                    <button className="logout" onClick={ handleLogOut}>Wyloguj się</button>
                </div> ): (<div className="youwerelogout"><h1 className="subpage">Zostałeś wylogowany</h1>  <Link to="/">Home</Link></div>)}    
        
        <h1>Lista recept</h1>
        </div>
    )
}

const mapStateToProps = state => ({
    permission: getPermissionInfo()
  })

const mapDispatchToProps = (dispatch) => ({
  updatePermission: () => dispatch(changePermission()),  
});

export default connect(null, mapDispatchToProps)(RecipesList);