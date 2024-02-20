import React, { useReducer, useCallback, useEffect } from "react";
import AdminContext from "./AdminContext";
import useAdmin from "./useAdmin";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children, value }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { state: { web3, accounts, networkID } } = useAdmin();
  console.log(value);

  const init = useCallback(
    async artifact => {
      if (artifact) {
        const { abi } = artifact;
        let address, contract;
        try {
          address = artifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifact = require("../../contracts/Admin.json");
        init(artifact);
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
    <AdminContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export default EthProvider;
