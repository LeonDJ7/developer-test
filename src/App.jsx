import React, { Component } from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {addItem, deleteItem} from './redux/actions';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
`;

const WishList = styled.div`
    width: 400px;
    height: 540px;
    background-color: pink;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    border-radius: 5px;
    box-shadow: 0px 0px 5px 5px grey
`;

const Label = styled.label`
    font-weight: bold;
`;

const Box = styled.span`
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 250px;
    background-color: white;
    border-radius: 5px;
    overflow: auto;
    align-items: flex-start;
    border-style: solid;
    border-width: 0.5px
`;

const TextField = styled.input`
    width: 250px;
    height: 25px;
    border-radius: 5px;
    border-width: 0.5px;
`;

const AddButton = styled.button`
    background-color: lightgreen;
    width: 100px;
    height: 40px;   
    font-weight: bold;
    border-radius: 5px;
    border: none;
    box-shadow: 0px 0px 2px 2px grey
`;

const SubmitButton = styled.button`
    background-color: lightgreen;
    width: 250px;
    height: 40px;
    font-weight: bold;
    border-radius: 5px;
    border: none;
    box-shadow: 0px 0px 2px 2px grey
`;

const ItemButton = styled.button`
    background:none;
    border:none;
    margin-left: 5px;
    margin-top: 5px;
`;

const App = () =>  {

    const wishList = useSelector(state => state.wishList)
    const [newItem, setNewItem] = React.useState('');
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setNewItem(e.target.value)
    }

    const add = (e) => {
        if (newItem != "") {
            dispatch(addItem(newItem));
            setNewItem('');
            document.getElementById('textbox').value = '';
        }
    }

    const submit = () => {

        if (wishList.length > 0) {
            alert('wish list submitted to santa!')
            wishList.forEach( (item) => {
                dispatch(deleteItem(item));
            });
        }

    }

    return (
        <React.Fragment>
            <Container>
                <WishList>
                    <Label>MY WISHLIST</Label>
                    <Box>
                        {wishList && wishList.map( (item) => {
                            return <ItemButton onClick={ (e) => { dispatch(deleteItem(e.target.innerText)); } }>{item}</ItemButton>
                        })}
                    </Box>
                    <TextField id='textbox' onChange={handleChange}/>
                    <AddButton onClick={add}>Add</AddButton>
                    <SubmitButton onClick={submit}>Submit</SubmitButton>
                </WishList>
            </Container>
        </React.Fragment>
    )
    
}

export default App;