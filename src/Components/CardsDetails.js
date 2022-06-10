import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE, ADD, DELONE } from '../redux/actions/action';

const CardsDetails = () => {

    const [data, setData] = useState([]);

    const { id } = useParams();

    const dispatch = useDispatch();

    const history = useNavigate();

    const getdata = useSelector((state) => state.cartreducer.carts);

    const compare = () => {
        let comparedata = getdata.filter((e) => {
            return e.id == id
        });
        setData(comparedata);
    }

    const Send = (e) => {
        // console.log(e) 
        dispatch(ADD(e))
    }

    const del = (id) => {
        dispatch(DELETE(id));
        history("/");
    }

    const rem = (item) => {
        dispatch(DELONE(item));
    }

    useEffect(() => {
        compare();
    }, [id]);

    return (
        <div className="container mt-2">
            <h2 className='text-center'>Food Details Page
            </h2>

            <section className='container mt-3'>
                <div className="iteamsdetails">
                    {
                        data.map((ele) => {
                            return (
                                <>
                                    <div className="items_img">
                                        <img src={ele.imgdata} alt="" />
                                    </div>

                                    <div className="details">
                                        <Table>
                                            <tr>
                                                <td>
                                                    <p> <strong>Restaurant</strong>  : {ele.rname}</p>
                                                    <p> <strong>Price</strong>  : ₹{ele.price}</p>
                                                    <p> <strong>Dishes</strong>  : {ele.address}</p>
                                                    <p> <strong>Total</strong>  :₹  {ele.price * ele.qnty}</p>
                                                    <div className='mt-5 d-flex justify-content-between align-items-center' style={{ width: 100, cursor: "pointer", background: "#ddd", color: "#111" }}>
                                                        <span style={{ fontSize: 24 }} onClick={ele.qnty <=1 ? ()=>del(ele.id) : ()=>rem(ele)}>-</span>
                                                        <span style={{ fontSize: 22 }}>{ele.qnty}</span>
                                                        <span style={{ fontSize: 24 }} onClick={()=> Send(ele)}>+</span>
                                                    </div>

                                                </td>
                                                <td>
                                                    <p><strong>Rating :</strong> <span style={{ background: "green", color: "#fff", padding: "2px 5px", borderRadius: "5px" }}>{ele.rating} ★	</span></p>
                                                    <p><strong>Order Review :</strong> <span >{ele.somedata}	</span></p>
                                                    <p><strong>Remove :</strong> <span ><DeleteIcon onClick={() => del(ele.id)} style={{ color: "red", fontSize: 20, cursor: "pointer" }} />	</span></p>
                                                </td>
                                            </tr>
                                        </Table>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    )
}

export default CardsDetails