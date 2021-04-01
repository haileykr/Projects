import React, { Component } from 'react'
import './LottoRandomContent.css'

import LottoBoxComponent from './lotto-box/LottoBoxComponent';

class LottoRandomContent extends Component {
    render(){
        const {lottoNumbers}=this.props;
        return (
            <div className = "lotto-random-content">
                
                
                
                {lottoNumbers.map((lottoNumber, i) =>
                <LottoBoxComponent
                key = {i}
                lottoNumber={lottoNumber}
                
                />)}
            </div>
        );
    }
}

export default LottoRandomContent;