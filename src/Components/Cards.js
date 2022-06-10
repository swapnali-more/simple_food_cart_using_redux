import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Cardsdata from "./CardsData";
import {ADD} from "../redux/actions/action"

const Cards = () => {
    const [data, setData] = useState(Cardsdata);

    const dispatch = useDispatch();

    const Send = (e) => {
        // console.log(e) 
        dispatch(ADD(e))
    }

    console.log(data);
    return (
        <div className='container my-4'>
            <h2 className='text-center display-5'>Food Villa</h2>
            <div className="row d-flex justify-content-center">
                {
                    data.map((element, id) => {
                        return (
                            <Card style={{ width: '22rem', border: "none" }} className="mx-2 mt-4 card_style">
                                <Card.Img variant="top" src={element.imgdata} style={{ height: "16rem" }} className="mt-3" />
                                <Card.Body>
                                    <Card.Title>{element.rname}</Card.Title>
                                    <Card.Text>
                                        Price : ₹{element.price}
                                    </Card.Text>
                                    <div className="button_div d-flex justify-content-center">
                                        <Button variant="primary"
                                        onClick={()=> Send(element)}
                                            className='col-lg-12'>Add to Cart</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Cards