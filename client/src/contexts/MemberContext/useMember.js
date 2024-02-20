import { useContext } from "react";
import MemberContext from "./MemberContext";

const useMember = () => useContext(MemberContext);

export default useMember;
