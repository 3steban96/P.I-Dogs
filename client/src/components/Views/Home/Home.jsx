import React from "react";
import CardsDog from "../../Card/CardsDog";
import '../../Card/Card.css'
import SearchBar from "../../SearchBar";

export default function Home(){
    return(
        <div>
            <SearchBar/>
            <CardsDog/>
        </div>
    )
}