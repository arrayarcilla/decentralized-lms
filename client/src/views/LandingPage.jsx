import React from 'react';
import NoticeNoArtifact from "../components/Demo/NoticeNoArtifact.jsx";
import NoticeWrongNetwork from "../components/Demo/NoticeWrongNetwork.jsx";
import Login from '../components/Login';
import useEth from "../contexts/EthContext/useEth.js";

function LandingPage() {
    const { state: { contract, accounts, artifact } } = useEth();
    const setUser = async () => {
        try {
            await contract.methods.setUsername().send({ from: accounts[0] });
        } catch (error) {
            console.log("error: ", error);
        }
    }
    return (
        <>
            <div class='landing-content'>
                {
                    !artifact ? <NoticeNoArtifact /> :
                        !contract ? <NoticeWrongNetwork /> :
                            <Login/>    
                }
                <button onClick={setUser}>set user</button>
            </div>
        </>
    );
}

export default LandingPage;