import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Dashboard = () => {

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
            <h1 className="quote">{quote.body}</h1>
            <p className="author">~ {quote.author} ~</p>
        </div>
    )
}

export default Dashboard;