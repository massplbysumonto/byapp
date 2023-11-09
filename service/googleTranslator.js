import React, { Component } from "react";
import translate from 'translate-google-api';

 class GoogleTranslator extends Component{
    constructor(){
        super();
    }
    getlanguage()
    {
        return "getlanguage";
    }

    async translate()
    {
        return  result = await translate(['Hi', 'How are you?', `I'm fine`], {
            tld: "cn",
            to: "vi",
          });
           ;
    }

}
export default new GoogleTranslator;