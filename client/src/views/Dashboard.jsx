import React, { useState } from "react";

import Sidebar from '../components/Sidebar';
import useEth from "../contexts/EthContext/useEth";

function Dashboard() {
    const { state } = useEth();
    const [items, setItems] = useState([[]]);

    const read = async () => {
        try{
            const newValue = await state.contract.methods.read().call({ from: state.accounts[0] });
            console.log("this is the read value:", newValue);
            setItems(newValue);
        }catch{
            console.log("error");
        }
        
    }

    const handleDelete = async (id)=> {
        try{
            console.log(id);
            await state.contract.methods.deleteItem(id).send({ from: state.accounts[0] });
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    const handleEdit = async (e) => {
        console.log("this is the edit area", e.target.value);
    }

    const addItem = async (e) => {
        e.preventDefault(); 
        try{
            await state.contract.methods.addItem(
                e.target[0].value, 
                e.target[1].value, 
                e.target[2].value, 
                e.target[3].value, 
                e.target[4].value, 
                e.target[5].value, 
                e.target[6].value, 
                e.target[7].value, 
                ["romance", "comedy"],
                e.target[9].value, 
                true)
                .send({ from: state.accounts[0] });
          }catch(err){
            console.log(err);
          }
    };
    
    return (
        <>
            <Sidebar />
            <div className='content'>
                <h1>Dashboard page</h1>
                <form onSubmit={addItem}>
                    <label htmlFor="">MediaType</label>
                    <input type="number" /><br/>
                    <label htmlFor="">Category</label>
                    <input type="number" /><br/>
                    <label htmlFor="">Title</label>
                    <input type="text" /><br/>
                    <label htmlFor="">Item Number</label>
                    <input type="number" /><br/>
                    <label htmlFor="">publisher</label>
                    <input type="text" /><br/>
                    <label htmlFor="">edition</label>
                    <input type="number" /><br/>
                    <label htmlFor="">year</label>
                    <input type="number" /><br/>
                    <label htmlFor="">Series Name</label>
                    <input type="text" /><br/>
                    <label htmlFor="">tags</label>
                    <input type="text" /><br/>
                    <label htmlFor="">copies</label>
                    <input type="number" /><br/>
                    <button type="submit">Submit</button>
                </form>

                <button onClick={read}>read</button>
                <ul>
                    {items.map((book, idx) => (
                        <li key={book.ID}> 
                            <h5>this is book ID num: {book.ID}</h5>
                            <label>{book.title}</label>
                            <form onSubmit={handleEdit}>
                                <label htmlFor="">Category</label>
                                <input type="number" /><br/>
                                <label htmlFor="">Series Name</label>
                                <input type="text" /><br/>
                                <label htmlFor="">tags</label>
                                <input type="text" /><br/>
                                <label htmlFor="">copies</label>
                                <input type="number" /><br/>
                                <button type="submit">Edit</button>
                            </form>
                            <button onClick={() => handleDelete(book.ID)}>Delete</button>
                            <ul>
                                {book.map((attribute) => (
                                    <li key={attribute}> 
                                        {attribute}
                                    </li>
                                ))}
                                <br/>
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Dashboard;


