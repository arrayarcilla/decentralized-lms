import React from 'react';
import NoticeNoArtifact from "../../components/Demo/NoticeNoArtifact.jsx";
import NoticeWrongNetwork from "../../components/Demo/NoticeWrongNetwork.jsx";
import Login from '../../components/Login.jsx';
import useEth from "../../contexts/EthContext/useEth.js";

function LandingPage() {
    // const { state } = useEth();
    return (
        <>
           
            <div className='landing-content'>
                <Login/>
                {/* {
                    !state.artifact ? <NoticeNoArtifact /> :
                        !state.contract ? <NoticeWrongNetwork /> :
                            <Login/>    
                } */}
            </div>
        </>
    );
}

export default LandingPage;