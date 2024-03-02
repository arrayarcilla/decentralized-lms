import React, { useState } from "react";

import Sidebar from '../components/Sidebar';
import useEth from "../contexts/EthContext/useEth";

function Dashboard() {
    const { state } = useEth();
    const [items, setItems] = useState([]);

    const read = async () => {
        try{
            const newValue = await state.contract.methods.read().call({ from: state.accounts[0] });
            console.log("this is the user role:", newValue);
            setItems(newValue[1]);
        }catch{
            console.log("error");
        }
        
    }

    const handleDelete = async (e)=> {
        try{
            console.log(e.target.value);
            await state.contract.methods.deleteItem().send({ from: state.accounts[0] });
        }catch{
            console.log(e);
        }

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
            <div class='content'>
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
                {items.map((item, idx) => (
                    <li key={items[11]}> 
                        {item}
                    </li>
                ))}
                <button onClick={() => handleDelete(items.ID)}>Delete</button>
            </div>
        </>
    );
}

export default Dashboard;


