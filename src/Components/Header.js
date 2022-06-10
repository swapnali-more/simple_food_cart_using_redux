import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Table } from 'react-bootstrap';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import Badge from '@mui/material/Badge';
import { NavLink } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE } from '../redux/actions/action';

const Header = () => {
    const [price, setPrice] = useState(0);

    const getdata = useSelector((state) => state.cartreducer.carts);

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const del = (id) => {
        dispatch(DELETE(id))
    }

    const total = () => {
        let price = 0;
        getdata.map((ele, key) => {
            price = ele.price * ele.qnty + price;
        })
        setPrice(price);
    }

    useEffect(() => {
        total();
    }, [total])
    return (
        <Navbar bg="dark" variant="dark" className='py-2'>
            <Container>
                <h1 className="mb-0"><NavLink to="/" className="text-decoration-none text-light me-3">FoodVilla</NavLink></h1>
                <Badge badgeContent={getdata.length} color="primary" id="fade-button" aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    <ShoppingCartIcon sx={{ fontSize: 25, color: "#fff", cursor: "pointer" }} />
                </Badge>

                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >

                    {getdata.length ?
                        <div className='card_details' style={{ width: "24rem", padding: 10 }}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Photo</th>
                                        <th>Restaurant Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        getdata.map((e) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>
                                                            <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                                                                <img src={e.imgdata} style={{ width: "5rem", height: "5rem" }} alt="" />
                                                            </NavLink>
                                                        </td>
                                                        <td>
                                                            <p>{e.rname}</p>
                                                            <p>Price : ₹{e.price}</p>
                                                            <p>Quantity : {e.qnty}</p>
                                                            <p style={{ color: "red", fontSize: 20, cursor: "pointer" }} className='smalltrash'>
                                                                <DeleteIcon onClick={() => del(e.id)} />
                                                            </p>
                                                        </td>

                                                        <td className='mt-5 largetrash' style={{ color: "red", fontSize: 20, cursor: "pointer" }}>
                                                            <DeleteIcon onClick={() => del(e.id)} />
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                    <p className='text-center'>Total: ₹ {price}</p>
                                </tbody>
                            </Table>
                        </div> :
                        <div className='card_details d-flex justify-content-center align-items-center' style={{ width: "24rem", padding: 10, position: "relative" }}>
                            <CloseIcon className='fas fa-close smallclose'
                                onClick={handleClose}
                                style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }} />
                            <p className="mb-0" style={{ fontSize: 15 }}>Your carts is empty</p>
                            <img src="./cart.gif" alt="" className='emptycart_img' style={{ width: "3rem", padding: "0 10px" }} />
                        </div>
                    }
                </Menu>

            </Container>
        </Navbar>
    )
}

export default Header