import React, { useState } from "react";

import Sidebar from '../components/Sidebar';
import useEth from "../contexts/EthContext/useEth";

function Dashboard() {
    const { state: { contract, accounts } } = useEth();
    const [items, setItems] = useState([]);
    const [mylList, setMyList] = useState([]);
    const [usernmae, setUsername] = useState("");
    const [borrowers, setBorrowers] = useState([]);
  
    const read = async () => {
      try {
        const newValue = await contract.methods.readAllItems().call({ from: accounts[0] });
        console.log("this is the read value:", newValue);
        setItems(newValue);
      } catch (error) {
        console.log("error");
      }
    };

    const getUsername = async () => {
      try {
        const myName = await contract.methods.getUsername(accounts[0]).call({ from: accounts[0] });
        console.log("this is the myName value:", myName);
        setUsername(myName);
      } catch (error) {
        console.log("error: ", error);
      }
    };

    const readMyList = async (e) => {
      e.preventDefault();
      try {
        const myValue = await contract.methods.getMyBorrowedItems().call({ from: accounts[0] });
        console.log("this is the read readMyList:", myValue);
        setMyList(myValue);
      } catch (error) {
        console.log("error");
      }
    };
  
    const handleDelete = async (id) => {
      try {
        await contract.methods.deleteItem(id).send({ from: accounts[0] });
        console.log("this is the new item list: ", items);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    const showBorrowers = async (id) => {
      try {
        const members = await contract.methods.getBorrowers(id).call({ from: accounts[0] });
        console.log("this is the borrowers:", members);
        setBorrowers(members);
      } catch (error) {
        console.log("error: ", error);
      }
    }
  
    const editItem = async (id, category, seriesName, tags, copies, isAvailable) => {
      try {
        await contract.methods.editItem(id, category, seriesName, tags, copies, isAvailable).send({ from: accounts[0] });
      } catch (err) {
        console.log(err);
      }
    };

    const borrowBook = async (bookId) => {
        try {
          console.log(`Borrowing book with ID: ${bookId}`); // Example placeholder=
          await contract.methods.borrowItem(bookId).send({ from: accounts[0] });
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };
  
    const addItem = async (e) => {
      e.preventDefault();
      try {
        await contract.methods.addItem(
          e.target[0].value,
          e.target[1].value,
          e.target[2].value,
          e.target[3].value,
          e.target[4].value,
          e.target[5].value,
          true,
          20 
        ).send({ from: accounts[0] });
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
        <>
            <Sidebar />
            <h1>{usernmae}</h1>
            <button onClick={getUsername}>get my username</button>

            <div className='content'>
                <h1>Dashboard page</h1>
                <form onSubmit={addItem}>
                    <label htmlFor="">MediaType</label>
                    <input type="number" /><br />
                    <label htmlFor="">Category</label>
                    <input type="number" /><br />
                    <label htmlFor="">Title</label>
                    <input type="text" /><br />
                    <label htmlFor="">Author</label>
                    <input type="text" /><br />
                    <label htmlFor="">ISBN</label>
                    <input type="number" /><br />
                    <label htmlFor="">publisher</label>
                    <input type="text" /><br />
                    <label htmlFor="">Is Available</label>
                    <select id="isAvailable" name="isAvailable">
                        <option value="true">Available</option>
                        <option value="false">Unavailable</option>
                    </select>
                    <br />
                    <label htmlFor="">copies</label>
                    <input type="number" /><br />
                    <button type="submit">Submit</button>
                </form>

                <button onClick={read}>read</button>
                <ul>
                    {items.map((book, idx) => (
                        <li key={book.ID}> 
                            <h5>this is book ID num: {book.ID}</h5>
                            <label>the item title: {book.title}</label>
                            <button onClick={() => handleDelete(book.ID)}>delete Item</button>
                            <ul>
                                {book.map((attribute) => (
                                    <li key={attribute.username}> 
                                        {attribute.username}
                                    </li>
                                ))}
                                <br/>
                            </ul>
                        </li>
                    ))}
                </ul>

                <h3>people who borrowed certain books</h3>
                <ul>
                    {items.map((book) => (
                        <li key={book.ID}>
                            <h5>Book ID: {book.ID}</h5>
                            <label>Title: {book.title}</label>
                            <button onClick={() => showBorrowers(book.ID)}>borrowrs</button>
                            <ul>
                                {borrowers.map((name) => (
                                    <li key={name}> 
                                        {name}
                                    </li>
                                ))}
                                <br/>
                            </ul>
                        </li>
                    ))}
                </ul>                    
              

                <h1>Members ONLY</h1>
                <h1>{usernmae}</h1>
                <button onClick={getUsername}>get my username</button>
                <ul>
                    {items.map((book) => (
                        <li key={book.ID}>
                            <h5>Book ID: {book.ID}</h5>
                            <label>Title: {book.title} </label>
                            <button onClick={() => borrowBook(book.ID)}>Borrow</button>
                        </li>
                    ))}
                </ul>
                <button onClick={readMyList}>My List of borrowed Items</button> 
                <ul>
                    {mylList.map((attribute) => (
                        <li key={attribute}> 
                            {attribute.title}
                        </li>
                    ))}
                    <br/>
                </ul>
            </div>
        </>
    );
}

export default Dashboard;