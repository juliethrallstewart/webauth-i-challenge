import React, {useState, useEffect, useContext} from 'react'
import UserContext from '../../contexts/UserContext';
import axios from 'axios'

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
        <div className="quote-container">
            <h1>Welcome {user.username}</h1>
            <h2 className="quote">{quote.body}</h2>
            <p className="author">~ {quote.author} ~</p>
        </div>
    )
}

export default Dashboard;