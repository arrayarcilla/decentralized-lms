import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const init = useCallback(
    async (accessLevel, web3, networkID, accounts) => {
      console.log("this is the accesslevel: ", accessLevel);
      let contract, artifact;
      if (accessLevel === "admin") {
        // artifact = require("../../contracts/Admin.json");
        contract = new web3.eth.Contract(artifact.abi, artifact.networks[networkID].address);
      } else if (accessLevel === "member") {
        // artifact = require("../../contracts/Member.json");
        contract = new web3.eth.Contract(artifact.abi, artifact.networks[networkID].address);
      }
      dispatch({
        type: actions.init,
        data: { artifact, web3, accounts, networkID, contract }
      });
    },
    [] // empty dependency array to avoid unnecessary re-initializations
  );
  
  const tryInit = async () => {
    try {
      const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
      const networkID = await web3.eth.net.getId();
      const libArtifact = require("../../contracts/Library.json");

      const accountContract = new web3.eth.Contract(libArtifact.abi, libArtifact.networks[networkID].address);
      const accounts = await web3.eth.requestAccounts();
      const userRole = await accountContract.methods.getRole().call({ from: accounts[0] });

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

      // Pass accessLevel directly to init function, avoiding state dependence
      await init(accessLevel, web3, networkID, accounts);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    
    tryInit();
    // Remove the init function from the dependency array
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = async () => {
      await tryInit(); // Wait for tryInit to complete
    };
  
    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init]);

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

