import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const init = useCallback(
    async (accessLevel, web3, networkID, accounts) => {
      let contract, artifact;
      if (accessLevel === "admin") {
        artifact = require("../../contracts/Member.json");
        contract = new web3.eth.Contract(artifact.abi, artifact.networks[networkID].address);
      } else if (accessLevel === "member") {
        artifact = require("../../contracts/Admin.json");
        contract = new web3.eth.Contract(artifact.abi, artifact.networks[networkID].address);
      }
  
      dispatch({
        type: actions.init,
        data: { artifact, web3, accounts, networkID, contract }
      });
      // dispatch({
      //    type: actions.init,
      //    data: { artifact, web3, accounts, networkID, contract }
      // });
    },
    [] // empty dependency array to avoid unnecessary re-initializations
  );

  useEffect(() => {
    const tryInit = async () => {
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const networkID = await web3.eth.net.getId();
        const libArtifact = require("../../contracts/Library.json");
      try {
        const accountContract = new web3.eth.Contract(libArtifact.abi, libArtifact.networks[networkID].address);
        const accounts = await web3.eth.requestAccounts();
        const userRole = await accountContract.methods.getRole(accounts[0]).call();
    
        let accessLevel;
        switch (userRole) {
          case "admin":
            accessLevel = "admin";
            break;
          case "member":
            accessLevel = "member";
            break;
          default:
            console.error("Invalid user role");
            break;
        }
    
        init(accessLevel, web3, networkID, accounts);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;

// function EthProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const init = useCallback(
//     async artifact => {
//       if (artifact) {
//         const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
//         const accounts = await web3.eth.requestAccounts();
//         const networkID = await web3.eth.net.getId();
//         const { abi } = artifact;
//         let address, contract;
//         try {
//           address = artifact.networks[networkID].address;
//           contract = new web3.eth.Contract(abi, address);
//         } catch (err) {
//           console.error(err);
//         }
//         dispatch({
//           type: actions.init,
//           data: { artifact, web3, accounts, networkID, contract }
//         });
//       }
//     }, []);

//   useEffect(() => {
//     const tryInit = async () => {
//       try {
//         const artifact = require("../../contracts/Account.json");
//         init(artifact);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     tryInit();
//   }, [init]);

//   useEffect(() => {
//     const events = ["chainChanged", "accountsChanged"];
//     const handleChange = () => {
//       init(state.artifact);
//     };

//     events.forEach(e => window.ethereum.on(e, handleChange));
//     return () => {
//       events.forEach(e => window.ethereum.removeListener(e, handleChange));
//     };
//   }, [init, state.artifact]);

//   return (
//     <EthContext.Provider value={{
//       state,
//       dispatch
//     }}>
//       {children}
//     </EthContext.Provider>
//   );
// }

// export default EthProvider;
