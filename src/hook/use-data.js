import { useContext } from "react";
import { MainData } from "../hoc/main-data";

export default function useData() {
    return useContext(MainData)
}