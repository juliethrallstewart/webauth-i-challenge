import React, {useState, useEffect, useContext} from 'react'
import UserContext from '../../contexts/UserContext';
import axios from 'axios'
import NavDashboard from '../Navigation/NavDashboard'

const Dashboard = (props) => {

    const { user } = useContext(UserContext);


    const [quote, setQuote] = useState({})

    useEffect(() => {
        axios.get('https://favqs.com/api/qotd')
        .then(res => {
            console.log(res.data)
            setQuote(res.data.quote)

        })
        .catch(e => {
            console.log(e)
        })

    }, []);
  

    return (
        <>
        <NavDashboard {...props}/>
        <div className="dashboard-container">
        <div className="greeting-container">
        <h1 className="greeting">Welcome {user.username},</h1>
        </div>
        <div className="quote-container">
            <h2 className="quote">{quote.body}</h2>
            <p className="author">~ {quote.author} ~</p>
        </div>
        </div>
        </>
        
    )
}

export default Dashboard;