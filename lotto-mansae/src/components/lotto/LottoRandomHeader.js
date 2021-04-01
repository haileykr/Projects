import React, { Component } from 'react'
import * as axios from 'axios';
import LottoBoxComponent from './lotto-box/LottoBoxComponent';
import './LottoRandomHeader.css';

class LottoRandomHeader extends Component {
    state = {
        lottoNumber: [],
        drwNo: 0
    }

    componentDidMount() {
        axios.get('http://localhost:5000/lottos/last').then((res) => {
            const data = res.data;
            console.log(data);
            if (data) {
                const lottoNumber = [];
                lottoNumber.push(data.drwNo1);
                lottoNumber.push(data.drwNo2);
                lottoNumber.push(data.drwNo3);
                lottoNumber.push(data.drwNo4);
                lottoNumber.push(data.drwNo5);
                lottoNumber.push(data.drwNo6);
                lottoNumber.push(data.bnusNo);
                this.setState({ lottoNumber, drwNo: data.drwNo });
            }
        })
    }

    render() {
        return (
            <div className="lotto-random-header">
                <div className="lotto-title">
                    Lotto Random Generator
                    <span>{this.state.drwNo}</span>
                </div>
                <div>
                    <LottoBoxComponent
                        lottoNumber={this.state.lottoNumber}
                    />
                </div>
            </div>
        );
    }
}


export default LottoRandomHeader;