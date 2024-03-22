import React from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

const PageError = () => {
    const navigate = useNavigate();
  return (
    <div>
        <div className="flex items-center justify-center mt-[100px] flex-col">
            <img src='https://img.freepik.com/free-vector/page-found-with-people-connecting-plug-concept-illustration_114360-1927.jpg?size=626&ext=jpg&ga=GA1.1.260354095.1700988836&semt=ais' height={'300px'} width={300} alt='404'/>
             <Button variant='dark' onClick={()=>navigate('/')} className='mt-5'>Go to Home</Button>
        </div>
    </div>
  )
}

export default PageError